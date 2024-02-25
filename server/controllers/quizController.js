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
module.exports = {
  getQuizById
}
