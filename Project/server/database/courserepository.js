const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

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
                    },
                    select:
                    {
                      lesson_id: true
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
                    },
                    // select:
                    // {
                    //   quiz_id: true
                    // }
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
      console.log('userProgress', userProgress.lesson)
      completedLessons = userProgress.topic.reduce((total, topic) => total + topic.lesson.reduce((total, lesson) => total + lesson.completed_lessons.length, 0), 0)
      completedQuizzes = userProgress.topic.reduce((total, topic) => total + topic.quiz.reduce((total, quiz) => total + quiz.completed_quizzes.length, 0), 0)
      console.log('completedLessons', completedLessons)
      console.log('completedQuizzes', completedQuizzes)
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

async function getCourseNames (language) {
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

    const userID = 3
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

module.exports = {
  getCourseNames
}
