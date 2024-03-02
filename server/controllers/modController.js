const cousrserepo = require('../database/courserepository')
const authorrepo = require('../database/authorrepository')

const addCourse = async (req, res) => {
  try {
    if (req.user.role !== 'moderator') {
      throw new Error('You are not authorized to perform this action')
    }
    const courseName = req.body.name
    const courseDescription = req.body.description
    const courseLanguage = req.body.language
    const coursetype = req.body.type
    const estimatedTime = parseInt(req.body.estimatedTime, 10)
    // const authorId = req.user.userId
    const courselevel = req.body.level
    const newCourse = await cousrserepo.addCourse(courseName, courseDescription, courseLanguage, coursetype, estimatedTime, courselevel)
    res.send({ newCourse, status: 'success', message: 'Course added successfully' })
  } catch (error) {
    res.status(500).send({ message: 'Error adding the course' + error.message, status: 'failed' })
  }
}

const addAuthorizedAuthor = async (req, res) => {
  try {
    if (req.user.role !== 'moderator') {
      throw new Error('You are not authorized to perform this action')
    }
    const courseId = parseInt(req.params.courseId, 10) // Typecast to integer
    const authorId = parseInt(req.body.authorId, 10)
    const newAuthorizedAuthor = await cousrserepo.addAuthorizedCourseAuthor(authorId, courseId)
    res.send({ newAuthorizedAuthor, status: 'success', message: 'Authorized Author added successfully' })
  } catch (error) {
    res.status(500).send({ message: 'Error adding the Authorized Author' + error.message, status: 'failed' })
  }
}

const searchAuthorByName = async (req, res) => {
  try {
    if (req.user.role !== 'moderator') {
      throw new Error('You are not authorized to perform this action')
    }
    // console.log('req.query\t', req.query.name)
    const authorName = req.query.name
    // console.log('authorName\t', authorName)
    const authors = await authorrepo.searchAuthorByName(authorName)
    res.send(authors)
  } catch (error) {
    res.status(500).send({ message: 'Error searching the author' + error.message, status: 'failed' })
  }
}

module.exports = {
  addCourse,
  addAuthorizedAuthor,
  searchAuthorByName
}
