const prisma = require('./prismaclient')

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

async function getAllCourses (userID, language) {
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

async function getCourseById (userID, courseId, language) {
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

module.exports = {
  getAllCourses,
  getCourseById
}
