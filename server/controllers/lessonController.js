const lessonrepository = require('../database/lessonrepository')

const getLessonById = async (req, res) => {
  // const userId = req.body.userId // Assuming userId is provided in the request body
  // const language = req.body.language // Assuming language is provided in the request body
  // const abstractionLevel = req.body.abstractionLevel // Assuming abstraction_level is provided in the request body
  // const lesson = await lessonrepository.getLessonById(userId, lessonId, language, abstractionLevel)
  try {
    const lessonId = parseInt(req.params.lessonId, 10) // Typecast to integer
    const lesson = await lessonrepository.getLessonById(3, lessonId, 'Novice')
    res.send(lesson)
  } catch (error) {
    res.status(500).send('Error retrieving the lesson' + error.message)
  }
}

const rateLesson = async (req, res) => {
  // const lessonId = parseInt(req.params.lessonId, 10) // Typecast to integer
  // const rating = req.body.rating // Assuming rating is provided in the request body
  // const feedback = req.body.feedback // Assuming feedback is provided in the request body
  // const userId = req.body.userId // Assuming userId is provided in the request body
  // const lesson = await lessonrepository.rateLesson(userId, lessonId, rating, feedback)
  // const lesson = await lessonrepository.rateLesson(3, lessonId, 3, 'Good job!')
  try {
    const lessonId = parseInt(req.params.lessonId, 10) // Typecast to integer
    // const lesson = await lessonrepository.rateLesson(userId, lessonId, rating, feedback)
    const lesson = await lessonrepository.rateLesson(3, lessonId, 3, '')
    res.send({ lesson, message: 'Lesson rated successfully' })
  } catch (error) {
    res.status(500).send({ message: 'An error occurred while rating the lesson', error: error.message })
  }
}

const completeLesson = async (req, res) => {
  // const lessonId = parseInt(req.params.lessonId, 10) // Typecast to integer
  // const userId = req.body.userId // Assuming userId is provided in the request body
  // const lesson = await lessonrepository.completeLesson(userId, lessonId, completionStatus)
  // const lesson = await lessonrepository.completeLesson(3, lessonId)
  // res.send(lesson)
  try {
    const lessonId = parseInt(req.params.lessonId, 10) // Typecast to integer
    // const lesson = await lessonrepository.completeLesson(userId, lessonId, completionStatus)
    const lesson = await lessonrepository.completeLesson(2, lessonId)
    res.send({ lesson, message: 'Lesson completed successfully' })
  } catch (error) {
    res.status(500).send('Error completing the lesson' + error.message)
  }
}

module.exports = {
  getLessonById,
  rateLesson,
  completeLesson
}
