const prisma = require('./prismaclient')
const filehander = require('../utils/filehander')

async function getQuizzesById (quizId, language) {
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
module.exports = {
  getQuizzesById
}
