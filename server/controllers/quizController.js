const quizrepository = require('../database/quizrepository')

const getQuizById = async (req, res) => {
  try {
    const quizId = parseInt(req.params.quizId, 10) // Typecast to integer
    const quiz = await quizrepository.getQuizzesById(quizId, 'English')
    res.send(quiz)
  } catch (error) {
    res.status(500).send('Error retrieving the quiz\t' + error.message)
  }
}
module.exports = {
  getQuizById
}
