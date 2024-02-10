const lessonrepository = require('../database/lessonrepository')

const getLessonById = async (req, res) => {
  const lessonId = parseInt(req.params.lessonId, 10) // Typecast to integer
  // const userId = req.body.userId // Assuming userId is provided in the request body
  // const language = req.body.language // Assuming language is provided in the request body
  // const abstractionLevel = req.body.abstractionLevel // Assuming abstraction_level is provided in the request body
  // const lesson = await lessonrepository.getLessonById(userId, lessonId, language, abstractionLevel)
  const lesson = await lessonrepository.getLessonById(3, lessonId, 'English', 'Novice')
  res.send(lesson)
}

module.exports = {
  getLessonById
}
