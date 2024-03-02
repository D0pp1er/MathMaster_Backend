const prisma = require('./prismaclient')
const filehander = require('../utils/filehander')
const userrepository = require('./userrepository')
async function getQuizzesById (quizId, userId) {
  const language = await userrepository.getUserPreferredLanguage(userId)
  const quiz = await prisma.quiz.findUnique({
    where: {
      quiz_id: quizId,
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
      XP: true,
      Total_score: true,
      quiz_content: {
        select: {
          content: true,
          name: true
        }

      }
    }
  })
  let quizcontent = ''

  if (quiz === null) {
    throw new Error('Quiz not found')
  }
  //   return quiz
  //   console.log(quiz.quiz_content.content)
  quizcontent = filehander.readFileData(quiz.quiz_content[0].content)
  if (quizcontent === null) {
    throw new Error('Quiz content not found at the given path')
  }

  const quizContent = {
    id: quiz.quiz_id,
    name: quiz.name,
    XP: quiz.XP,
    Total_score: quiz.Total_score,
    content: quizcontent
  }
  return quizContent
}

async function editQuiz (quizId, xp, totalScore, quizname, quizcontent, language) {
  const languageID = await prisma.language.findUnique({
    where: {
      name: language
    },
    select: {
      language_id: true
    }
  })
  if (languageID === null) {
    throw new Error('Language not found')
  }

  const updatedQuiz = await prisma.quiz.update({
    where: { quiz_id: quizId },
    data: {
      XP: xp,
      Total_score: totalScore,
      quiz_content: {
        update: {
          where: { quiz_id_language_id: { quiz_id: quizId, language_id: languageID.language_id } },
          data: {
            name: quizname
          }
        }
      }
    },
    select: {
      quiz_id: true,
      XP: true,
      Total_score: true,
      quiz_content: {
        select: {
          content: true,
          name: true
        }
      }
    }
  })

  if (updatedQuiz === null) {
    throw new Error('Error updating the quiz')
  }
  const filepath = updatedQuiz.quiz_content[0].content
  const fileContent = filehander.writeFile(filepath, quizcontent)
  if (fileContent === null) {
    throw new Error('Error writing quiz content')
  }
  updatedQuiz.quiz_content[0].content = fileContent
  return updatedQuiz
}

async function addQuiz (topicId, xp, totalScore, quizName, quizContent, language) {
  const languageId = await prisma.language.findUnique({
    where: {
      name: language
    }
  })
  if (languageId === null) {
    throw new Error('Language not found')
  }
  const quiz = await prisma.quiz.create({
    data: {
      topic_id: topicId,
      XP: xp,
      Total_score: totalScore,
      quiz_content: {
        create: {
          name: quizName,
          content: 'mock content',
          language_id: languageId.language_id
        }
      }
    }
  })
  const quizContentPath = '../contents/unpublished/language_' + language + '/quizzes/quiz_' + quiz.quiz_id + '.txt'
  filehander.writeFile(quizContentPath, quizContent)
  const updatedContent = await prisma.quiz_content.update({
    where: {
      quiz_id_language_id: {
        quiz_id: quiz.quiz_id,
        language_id: languageId.language_id
      }
    },
    data: {
      content: quizContentPath
    }
  })
  updatedContent.content = quizContent
  return updatedContent
}

module.exports = {
  getQuizzesById,
  editQuiz,
  addQuiz
}
