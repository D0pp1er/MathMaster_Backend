const authorrepository = require('../database/authorrepository')

const getLessonById = async (req, res) => {
  try {
    // const lessonId = parseInt(req.params.lessonId, 10) // Typecast to integer
    // const lesson = await lessonrepository.getLessonById(3, lessonId, 'Novice')
    // res.send(lesson)
    if (req.user.role !== 'author') {
      throw new Error('You are not authorized to perform this action')
    }
    // const lessonId = parseInt(req.params.lessonId, 10) // Typecast to integer
    console.log('req.query', req.query)
    let language = res.query.lang
    let abstractionLevel = res.query.abs
    const courseId = parseInt(res.query.courseId, 10)
    if (language === undefined) {
      language = 'English'
    }
    if (abstractionLevel === undefined) {
      abstractionLevel = 'Novice'
    }
    if (courseId === undefined) {
      throw new Error('CourseId is required')
    }
    await authorrepository.CheckCourseAccess(req.user.userId, courseId)
    res.send('Hello from getLessonById')
  } catch (error) {
    res.status(500).send('Error retrieving the lesson' + error.message)
  }
}

const editCourse = async (req, res) => {
  try {
    if (req.user.role !== 'author') {
      throw new Error('\tYou are not authorized to perform this action')
    }
    const courseId = parseInt(req.params.courseId, 10) // Typecast to integer
    const courseName = req.body.name
    const courseDescription = req.body.description
    const courseLanguage = req.body.language
    const coursetype = req.body.type
    const estimatedTime = parseInt(req.body.estimatedTime, 10)
    const authorId = req.user.userId
    const updatedCourseContent = await authorrepository.editCourse(authorId, courseId, courseName, courseDescription, courseLanguage, coursetype, estimatedTime)
    res.send({ updatedCourse: updatedCourseContent, status: 'success', message: 'Course updated successfully' })
  } catch (error) {
    res.status(500).send({ message: 'Error updating the course\t' + error.message, status: 'failed' })
  }
}

module.exports = {
  getLessonById,
  editCourse
}
