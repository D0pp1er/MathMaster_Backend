const quizrepository = require('../database/quizrepository')

const getQuizById = async (req, res) => {
  try {
    const quizId = parseInt(req.params.quizId, 10) // Typecast to integer
    // const userId = req.body.userId // Assuming userId is provided in the request body
    // const quiz = await quizrepository.getQuizzesById(quizId,userId)
    const userId = req.user.userId
    const quiz = await quizrepository.getQuizzesById(quizId, userId)
    res.send(quiz)
  } catch (error) {
    res.status(500).send('Error retrieving the quiz\t' + error.message)
  }
}

const editQuiz = async (req, res) => {
  try {
    const quizId = parseInt(req.params.quizId, 10) // Typecast to integer
    const xp = parseInt(req.body.xp, 10)
    const totalScore = parseInt(req.body.totalScore, 10)
    const quizname = req.body.name
    const quizcontent = req.body.content
    const language = req.body.language
    const updatedQuiz = await quizrepository.editQuiz(quizId, xp, totalScore, quizname, quizcontent, language)
    res.send({ updatedQuiz, status: 'success', message: 'Quiz updated successfully' })
  } catch (error) {
    // console.log('Error updating the quiz\t' + error.message)
    res.status(500).send({ message: 'Error updating the quiz\t' + error.message, status: 'failed' })
  }
}

const submitquiz = async (req, res) => {
  try {
    const quizId = parseInt(req.params.quizId, 10) // Typecast to integer
    const userId = req.user.userId
    const score = parseInt(req.body.score, 10)
    const xp = parseInt(req.body.xp, 10)
    const submittedQuiz = await quizrepository.submitquiz(quizId, userId, score, xp)
    res.send({ submittedQuiz, status: 'success', message: 'Quiz submitted successfully' })
  } catch (error) {
    res.status(500).send({ message: 'Error submitting the quiz\t' + error.message, status: 'failed' })
  }
}

const getQuizStatOfUser = async (req, res) => {
  try {
    const userId = req.user.userId
    const quizId = parseInt(req.params.quizId, 10) // Typecast to integer
    const language = req.user.preferredLanguage
    const quizStat = await quizrepository.getQuizStatOfUser(quizId, userId, language)
    res.send(quizStat)
  } catch (error) {
    res.status(500).send('Error retrieving the quiz stat\t' + error.message)
  }
}

module.exports = {
  getQuizById,
  editQuiz,
  submitquiz,
  getQuizStatOfUser
}
