const prisma = require('./prismaclient')
const userrepository = require('./userrepository')
async function getUserProgress (userId, courseId) {
  try {
    const userProgress = await prisma.course.findUnique({
      where: {
        course_id: courseId,
        enrolled_courses:
        {
          some: {
            user_id: userId,
            course_id: courseId
          }
        }
      },
      select: {
        topic: {
          select:
            {
              lesson:
              {
                select:
                {
                  completed_lessons:
                  {
                    where:
                    {
                      user_id: userId
                    }
                  }
                }
              },
              quiz:
              {
                select:
                {
                  completed_quizzes:
                  {
                    where:
                    {
                      user_id: userId
                    }
                  }
                }
              }
            }
        }

      }
    })
    const enrolled = userProgress !== null
    let completedLessons = 0
    let completedQuizzes = 0
    if (enrolled) {
      // console.log('userProgress', userProgress.lesson)
      completedLessons = userProgress.topic.reduce((total, topic) => total + topic.lesson.reduce((total, lesson) => total + lesson.completed_lessons.length, 0), 0)
      completedQuizzes = userProgress.topic.reduce((total, topic) => total + topic.quiz.reduce((total, quiz) => total + quiz.completed_quizzes.length, 0), 0)
      // console.log('completedLessons', completedLessons)
      // console.log('completedQuizzes', completedQuizzes)
    }
    return { enrolled, completedLessons, completedQuizzes }
  } catch (error) {
    console.error('Error retrieving user progress:', error)
    throw error
  }
}

async function getLessonAndQuizCount (courseId, language) {
  try {
    const course = await prisma.course.findUnique({
      where: {
        course_id: courseId
      },
      select: {
        topic: {
          select: {
            lesson: {
              where: {
                lesson_content: {
                  some: {
                    language: {
                      name: language
                    }
                  }
                }
              },
              select:
              {
                lesson_id: true
              }
            },
            quiz: {
              where: {
                quiz_content: {
                  some: {
                    language: {
                      name: language
                    }
                  }
                }
              },
              select: {
                quiz_id: true
              }
            }
          }
        }
      }
    })

    const lessonCount = course.topic.reduce((total, topic) => total + topic.lesson.length, 0)
    const quizCount = course.topic.reduce((total, topic) => total + topic.quiz.length, 0)
    // const quizCount = course.quiz.count

    return { lessonCount, quizCount }
  } catch (error) {
    console.error('Error retrieving lesson and quiz count:', error)
    throw error
  }
}

async function getAuthorsByCourseAndLanguage (courseId, languageName) {
  try {
    const authors = await prisma.course.findUnique({
      where: {
        course_id: courseId
      },
      select: {
        topic: {
          select: {
            lesson: {
              where: {
                lesson_content: {
                  some: {
                    language: {
                      name: languageName
                    }
                  }
                }
              },
              select: {
                lesson_author: {
                  select: {
                    author: {
                      select: {
                        content_author_id: true,
                        user: {
                          select: {
                            name: true
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    })
    // console.log(authors)
    const uniqueAuthors = new Map()
    authors.topic.forEach(topic => {
      // console.log(topic)
      topic.lesson.forEach(lesson => {
        // console.log(lesson)
        lesson.lesson_author.forEach(author => {
          // console.log(author)
          uniqueAuthors.set(author.author.content_author_id, author.author.user.name)
          // uniqueAuthors.set(author)
        })
      })
    })
    // console.log(uniqueAuthors)
    const authorsArray = Array.from(uniqueAuthors.entries()).map(([id, name]) => ({ id, name }))
    return authorsArray
  } catch (error) {
    console.error('Error retrieving authors:', error)
    throw error
  }
}

async function getAllCourses (userID) {
  const language = await userrepository.getUserPreferredLanguage(userID)
  try {
    const courses = await prisma.course.findMany(
      {
        select: {
          course_id: true,
          course_content:
          {
            where: {
              language: {
                name: language
              }
            },
            select: {
              name: true,
              description: true
            }
          },
          type:
          {
            select: {
              name: true
            }
          },
          estimated_time: true,
          course_level:
          {
            select: {
              name: true
            }
          },
          picture: true
        }
      }
    )

    const result = await Promise.all(courses.map(async (course) => {
      const lessonAndQuizCount = await getLessonAndQuizCount(course.course_id, language)
      const courseauthors = await getAuthorsByCourseAndLanguage(course.course_id, language)
      const enrollmentstat = await getUserProgress(userID, course.course_id)
      const completion = Math.round((enrollmentstat.completedLessons + enrollmentstat.completedQuizzes) / (lessonAndQuizCount.lessonCount + lessonAndQuizCount.quizCount) * 100)

      return {
        id: course.course_id,
        name: course.course_content[0].name,
        type: course.type.name,
        estimatedTime: course.estimated_time,
        difficulty: course.course_level.name,
        image: course.picture,
        description: course.course_content[0].description,
        authors: courseauthors,
        lessonCount: lessonAndQuizCount.lessonCount,
        quizCount: lessonAndQuizCount.quizCount,
        isEnrolled: enrollmentstat.enrolled,
        completed: completion
      }
    }))
    return result
  } catch (error) {
    console.error('Error retrieving course names:', error)
    throw error
  }
}
async function hasUserCompletedLessons (userId, lessonId) {
  const completedLessons = await prisma.completed_lessons.findFirst({
    where: {
      user_id: userId,
      lesson_id: lessonId
    }
  })

  return !!completedLessons
}

// issue here
async function hasUserCompletedQuizzes (userId, quizId) {
  const completedQuizzes = await prisma.completed_quizzes.findFirst({
    where: {
      user_id: userId,
      quiz_id: quizId
    }
  })

  return !!completedQuizzes
}
async function getQuizByTopicID (userID, topicId, language) {
  try {
    const quizzes = await prisma.quiz.findMany({
      where: {
        topic_id: topicId,
        quiz_content: {
          some: {
            language: {
              name: language
            }
          }
        }
      },
      select: {
        quiz_id: true,
        quiz_content: {
          select: {
            name: true
          }
        }
      }
    })
    const result = await Promise.all(quizzes.map(async (quiz) => {
      const completedqstat = await hasUserCompletedQuizzes(userID, quiz.quiz_id)
      return {
        id: quiz.quiz_id,
        name: quiz.quiz_content[0].name,
        completed: completedqstat
      }
    }))
    return result
  } catch (error) {
    console.error('Error retrieving quizzes by topic ID:', error)
    throw error
  }
}

async function getLessonByTopicID (userID, topicId, language) {
  try {
    const lessons = await prisma.lesson.findMany({
      where: {
        topic_id: topicId,
        lesson_content: {
          some: {
            language: {
              name: language
            }
          }
        }
      },
      select: {
        lesson_id: true,
        lesson_content: {
          select: {
            name: true
          }
        }
      }
    })
    const result = await Promise.all(lessons.map(async (lesson) => {
      const completedlstat = await hasUserCompletedLessons(userID, lesson.lesson_id)
      return {
        id: lesson.lesson_id,
        name: lesson.lesson_content[0].name,
        completed: completedlstat
      }
    }))
    return result
  } catch (error) {
    console.error('Error retrieving lessons by topic ID:', error)
    throw error
  }
}
async function getCourseOutline (userID, courseId, language) {
  try {
    const courseOutline = await prisma.course.findMany({
      where: {
        course_id: courseId
      },
      select: {
        topic: {
          where:
              {
                topic_content: {
                  some: {
                    language: {
                      name: language
                    }
                  }
                }
              },
          select: {
            topic_id: true,
            topic_content:
            {
              select: {
                name: true,
                description: true
              }
            }
          }
        }
      }

    })

    async function mapCourseOutline (courseOutline) {
      if (courseOutline && Array.isArray(courseOutline)) {
        // console.log("courseOutline", courseOutline)
        const topics = await Promise.all(courseOutline.map(async (topic) => {
          const id = topic.topic_id
          const name = topic.topic_content[0].name
          const description = topic.topic_content[0].description
          const lessons = await getLessonByTopicID(userID, id, language)
          const quizes = await getQuizByTopicID(userID, id, language)

          const isCourseCompleted = (courseOutline) => {
            for (const topic of courseOutline) {
              if (!courseOutline) {
                return false
              }
              if (!topic.lessons || !topic.quizzes) {
                return false
              }
              for (const lesson of topic.lessons) {
                if (!lesson.completed) {
                  return false
                }
              }
              for (const quiz of topic.quizzes) {
                if (!quiz.completed) {
                  return false
                }
              }
            }
            return true
          }

          return {
            id,
            name,
            description,
            completed: isCourseCompleted(courseOutline),
            lessons,
            quizes
          }
        }))
        return topics
      } else {
        throw new Error('Invalid courseOutline')
      }
    }
    return mapCourseOutline(courseOutline[0].topic)
    // return topics
  } catch (error) {
    console.error('Error retrieving course outline:', error)
    throw error
  }
}

async function getCourseById (userID, courseId) {
  const language = await userrepository.getUserPreferredLanguage(userID)
  try {
    const course = await prisma.course.findUnique({
      where: {
        course_id: courseId
      },
      select: {
        course_id: true,
        picture: true,
        course_content:
        {
          where: {
            language: {
              name: language
            }
          },
          select: {
            name: true,
            description: true
          }
        }
      }
    })
    const courseauthors = await getAuthorsByCourseAndLanguage(course.course_id, language)
    const courseOutline = await getCourseOutline(userID, courseId, language)

    const result = {
      id: course.course_id,
      name: course.course_content[0].name,
      image: course.picture,
      description: course.course_content[0].description,
      authors: courseauthors,
      content: courseOutline
    }
    return result
  } catch (error) {
    console.error('Error retrieving course by ID:', error)
    throw error
  }
}

// async function getTotalXPofCourseFromLessonAndQuiz (courseId) {
//   try {
//     const totalXPLesson = await prisma.lesson.findMany({
//       where: {
//         topic: {
//           course_id: courseId
//         }
//       },
//       select: {
//         XP: true
//       }
//     })
//     const toalXPQuiz = await prisma.quiz.findMany({
//       where: {
//         topic: {
//           course_id: courseId
//         }
//       },
//       select: {
//         XP: true
//       }
//     })
//     let totalXPofCourse = totalXPLesson.reduce((total, lesson) => total + lesson.XP, 0)
//     totalXPofCourse += toalXPQuiz.reduce((total, quiz) => total + quiz.XP, 0)

//     return totalXPofCourse
//   } catch (error) {
//     console.error('Error retrieving total XP of course from lesson and quiz:', error)
//     throw error
//   }
// }

async function getTotalEnrolledUsers (courseId) {
  try {
    const totalEnrolledUsers = await prisma.enrolled_courses.count({
      where: {
        course_id: courseId
      }
    })
    return totalEnrolledUsers
  } catch (error) {
    console.error('Error retrieving total enrolled users:', error)
    throw error
  }
}

async function getCourseRating (courseId) {
  try {
    const courseRating = await prisma.course.findUnique({
      where: {
        course_id: courseId
      },
      select: {
        course_rating:
        {
          select: {
            rating: true
          }
        }
      }
    })
    const ratingsCount = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0
    }

    courseRating.course_rating.forEach(rating => {
      ratingsCount[rating.rating] += 1
    })

    return ratingsCount

    // return courseRating
  } catch (error) {
    console.error('Error retrieving course rating:', error)
    throw error
  }
}
async function getUserRating (userId, courseId) {
  try {
    const userRating = await prisma.course_rating.findFirst({
      where: {
        user_id: userId,
        course_id: courseId
      },
      select: {
        rating: true
      }
    })
    if (!userRating) {
      return 0
    }
    return userRating.rating
  } catch (error) {
    console.error('Error retrieving user rating:', error)
    throw error
  }
}

async function getCourseOverallOutlinebyID (userID, courseId) {
  const language = await userrepository.getUserPreferredLanguage(userID)
  try {
    const course = await prisma.course.findUnique({
      where: {
        course_id: courseId
      },
      select: {
        course_id: true,
        picture: true,
        course_content:
        {
          where: {
            language: {
              name: language
            }
          },
          select: {
            name: true,
            description: true
          }
        },
        type:
        {
          select: {
            name: true
          }
        },
        course_level:
        {
          select: {
            name: true
          }
        },
        estimated_time: true
      }
    })
    const courseauthors = await getAuthorsByCourseAndLanguage(course.course_id, language)
    const getUserProgressStat = await getUserProgress(userID, courseId)
    const lessonAndQuizCount = await getLessonAndQuizCount(courseId, language)
    const enrolledUsers = await getTotalEnrolledUsers(courseId)
    const rating = await getCourseRating(courseId)
    const myRating = await getUserRating(userID, courseId)
    const result = {
      id: course.course_id,
      name: course.course_content[0].name,
      type: course.type.name,
      difficulty: course.course_level.name,
      estimatedTime: course.estimated_time,
      image: course.picture,
      description: course.course_content[0].description,
      authors: courseauthors,
      lessonCount: lessonAndQuizCount.lessonCount,
      quizCount: lessonAndQuizCount.quizCount,
      lessonCompleted: getUserProgressStat.completedLessons,
      quizCompleted: getUserProgressStat.completedQuizzes,
      enrollmentCount: enrolledUsers,
      ratings: rating,
      isEnrolled: getUserProgressStat.enrolled,
      myRating

    }
    return result
  } catch (error) {
    console.error('Error retrieving course overall outline by ID:', error)
    throw error
  }
}

async function enrollCourse (userId, courseId) {
  try {
    const enrolledCourse = await prisma.enrolled_courses.create({
      data: {
        user_id: userId,
        course_id: courseId,
        timestamp: new Date()

      }
    })
    return enrolledCourse
  } catch (error) {
    console.error('Error enrolling course:', error)
    throw error
  }
}

async function rateCourse (userId, courseId, rating) {
  try {
    const isEnrolled = await prisma.enrolled_courses.findFirst({
      where: {
        user_id: userId,
        course_id: courseId
      }
    })
    if (!isEnrolled) {
      const message = 'User is not enrolled in the course'
      throw new Error(message)
    }
    const existingRating = await prisma.course_rating.findUnique({
      where: {
        course_id_user_id: {

          user_id: userId,
          course_id: courseId
        }

      }
    })

    if (existingRating) {
      existingRating.rating = rating
      const updatedRating = await prisma.course_rating.update({
        where: {
          course_id_user_id: {

            user_id: userId,
            course_id: courseId
          }
        },
        data: {
          rating
        }
      })
      return updatedRating
    } else {
      const newRating = await prisma.course_rating.create({
        data: {
          user_id: userId,
          course_id: courseId,
          rating
        }
      })
      return newRating
    }
  } catch (error) {
    console.error('Error rating course:', error)
    throw error
  }
}

module.exports = {
  getAllCourses,
  getCourseById,
  getCourseOverallOutlinebyID,
  enrollCourse,
  rateCourse
}
