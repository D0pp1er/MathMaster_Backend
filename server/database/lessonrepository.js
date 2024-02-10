const prisma = require('./prismaclient')
const filehander = require('../utils/filehander')

async function getCompletionStatus (userId, lessonId) {
  const completionStatus = await prisma.completed_lessons.findUnique({
    where: {
      user_id_lesson_id: {
        user_id: userId,
        lesson_id: lessonId
      }
    },
    select: {
      timestamp: true,
      rating: true,
      feedback: true
    }
  })
  if (completionStatus === null) {
    const status = {
      completed: false,
      rating: 0,
      feedback: 'No feedback given yet.'
    }
    return status
  }
  if (completionStatus.rating === null) {
    completionStatus.rating = 0
  }
  if (completionStatus.feedback === null) {
    completionStatus.feedback = 'No feedback given yet.'
  }
  const status = {
    timestamp: completionStatus.timestamp,
    completed: true,
    rating: completionStatus.rating,
    feedback: completionStatus.feedback
  }
  return status
}
async function getLessonAuthor (lessonId, language, abstractionLevel) {
  const lesson = await prisma.lesson.findMany({
    where: {
      lesson_id: lessonId
    },
    select: {
      lesson_author: {
        where: {
          language: {
            name: language
          },
          abstraction_level: {
            name: abstractionLevel
          }
        },
        select: {
          author_id: true,
          author:
                    {
                      select:
                        {
                          user:
                        {
                          select:
                            {
                              name: true
                            }
                        }

                        }
                    }

        }

      }
    }
  })

  if (lesson === null) {
    const authors = []
    return authors
    // throw new Error('Lesson not found')
  }
  const authors = []
  lesson[0].lesson_author.forEach((author) => {
    authors.push({ id: author.author_id, name: author.author.user.name })
  })
  //   if (authors.length === 0) {
  //     throw new Error('Lesson author not found')
  //   }
  return authors
}

async function getLessonById (userId, lessonId, language, abstractionLevel) {
  const lesson = await prisma.lesson.findUnique({
    where: {
      lesson_id: lessonId
    },
    select: {
      lesson_id: true,
      XP: true,
      lesson_content: {
        where: {
          language:
                    {
                      name: language
                    },
          abstraction_level: {
            name: abstractionLevel
          }
        },
        select: {
          content: true,
          name: true
        }
      }
    }
  })

  if (lesson === null) {
    throw new Error('Lesson not found')
  }
  if (lesson.lesson_content.length === 0) {
    lesson.lesson_content.push({ content: 'No content available for this lesson', name: 'No Name available for this lesson' })
  }
  const lessonAuthor = await getLessonAuthor(lessonId, language, abstractionLevel)
  const completionStatus = await getCompletionStatus(userId, lessonId)
  let lessonContent = ''
  if (lesson.lesson_content[0].content !== 'No content available for this lesson') {
    const filePath = lesson.lesson_content[0].content
    const fileContent = filehander.readFileData(filePath)
    if (fileContent === null) {
    //   throw new Error('Error reading lesson content')
      lessonContent = 'Error reading lesson content'
    // return lessonContent
    }
    lessonContent = fileContent
  } else {
    lessonContent = 'No content available for this lesson'
    // return lessonContent
  }
  const lessons = {
    id: lesson.lesson_id,
    XP: lesson.XP,
    content: lessonContent,
    name: lesson.lesson_content[0].name,
    authors: lessonAuthor,
    isCompleted: completionStatus.completed,
    myRating: completionStatus.rating,
    feedback: completionStatus.feedback

  }
  return lessons
}

async function rateLesson (userId, lessonId, rating, feedback) {
  const completionStatus = await getCompletionStatus(userId, lessonId)
  if (completionStatus.completed === false) {
    throw new Error('Lesson not completed yet')
  }
  const ratedLesson = await prisma.completed_lessons.update({
    where: {
      user_id_lesson_id: {
        user_id: userId,
        lesson_id: lessonId
      }
    },
    data: {
      rating,
      feedback
    },
    select: {
      rating: true,
      feedback: true,
      timestamp: true,
      user_id: true,
      lesson_id: true
    }
  })
  return ratedLesson
}

async function completeLesson (userId, lessonId) {
  const completionStatus = await getCompletionStatus(userId, lessonId)
  if (completionStatus.completed === true) {
    throw new Error('Lesson already completed')
  }
  const completedLesson = await prisma.completed_lessons.create({
    data: {
      user_id: userId,
      lesson_id: lessonId,
      timestamp: new Date()
    }
  })
  return completedLesson
}
module.exports = {
  getLessonById,
  rateLesson,
  completeLesson
}
