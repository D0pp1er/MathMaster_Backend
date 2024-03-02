const prisma = require('./prismaclient')
const filehander = require('../utils/filehander')
const userrepository = require('./userrepository')

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

async function getLessonById (userId, lessonId, abstractionLevel) {
  const language = await userrepository.getUserPreferredLanguage(userId)
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
    // throw new Error('Lesson already completed')
    async function deleteCompletedLesson (userId, lessonId) {
      const deletedLesson = await prisma.completed_lessons.delete({
        where: {
          user_id_lesson_id: {
            user_id: userId,
            lesson_id: lessonId
          }
        }
      })
      return deletedLesson
    }
    const deletedLesson = await deleteCompletedLesson(userId, lessonId)
    return deletedLesson
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

async function isAuthor (userId, lessonId, abstractionLevel, language) {
  const languageId = await prisma.language.findUnique({
    where: {
      name: language
    }
  })
  const abstractionLevelId = await prisma.abstraction_level.findUnique({
    where: {
      name: abstractionLevel
    }
  })
  const author = await prisma.lesson_author.findUnique({
    where: {
      author_id_lesson_id_language_id_abstraction_level_id: {
        author_id: userId,
        lesson_id: lessonId,
        language_id: languageId.language_id,
        abstraction_level_id: abstractionLevelId.abstraction_level_id
      }
    }
  })
  // console.log(author)
  if (author === null) {
    throw new Error('You are not the author of this lesson')
  }
  return author
}

async function editlesson (lessonId, languageId, abstractionLevelId, lessonContent, lessonName) {
  const editedLesson = await prisma.lesson_content.update({
    where: {
      lesson_id_language_id_abstraction_level_id: {
        lesson_id: lessonId,
        language_id: languageId,
        abstraction_level_id: abstractionLevelId
      }
    },
    data: {
      name: lessonName
    },
    select: {
      name: true,
      content: true,
      lesson_id: true,
      language_id: true,
      abstraction_level_id: true
    }
  })
  // console.log(editedLesson)
  if (editedLesson.content == null) {
    throw new Error('No content provided for the lesson')
  }
  const filePath = editedLesson.content
  // console.log(filePath)
  // console.log(lessonContent)
  const fileContent = filehander.writeFile(filePath, lessonContent)
  if (fileContent === null) {
    throw new Error('Error writing lesson content')
  }
  return { editedLesson, fileContent }
}

async function addLesson (topicId, lessonXP, lessonName, lessonContent, language, abstractionLevel, authorId) {
  const languageId = await prisma.language.findUnique({
    where: {
      name: language
    }
  })
  if (languageId === null) {
    throw new Error('Language not found')
  }
  const abstractionLevelId = await prisma.abstraction_level.findUnique({
    where: {
      name: abstractionLevel
    }
  })
  if (abstractionLevelId === null) {
    throw new Error('Abstraction Level not found')
  }
  const lesson = await prisma.lesson.create({
    data: {
      topic_id: topicId,
      XP: lessonXP
    }
  })
  const newlessonContent = await prisma.lesson_content.create({
    data: {
      lesson_id: lesson.lesson_id,
      language_id: languageId.language_id,
      abstraction_level_id: abstractionLevelId.abstraction_level_id,
      name: lessonName,
      content: 'mock content'
    }
  })
  // ../contents/published/language_English/lessons/lesson_1.txt
  const lessonFilePath = '../contents/unpublished/language_' + language + '/lessons/abstraction_' + abstractionLevel + '/lesson_' + lesson.lesson_id + '.txt'
  const fileContent = filehander.writeFile(lessonFilePath, lessonContent)
  const lessonAuthor = await prisma.lesson_author.create({
    data: {
      author_id: authorId,
      lesson_id: lesson.lesson_id,
      language_id: languageId.language_id,
      abstraction_level_id: abstractionLevelId.abstraction_level_id
    }
  })
  newlessonContent.content = fileContent
  const updatedLessonContent = await prisma.lesson_content.update({
    where: {
      lesson_id_language_id_abstraction_level_id: {
        lesson_id: lesson.lesson_id,
        language_id: languageId.language_id,
        abstraction_level_id: abstractionLevelId.abstraction_level_id
      }
    },
    data: {
      content: lessonFilePath
    }
  })
  updatedLessonContent.content = fileContent

  return { lesson, updatedLessonContent, lessonAuthor }
}

module.exports = {
  getLessonById,
  rateLesson,
  completeLesson,
  isAuthor,
  editlesson,
  addLesson
}
