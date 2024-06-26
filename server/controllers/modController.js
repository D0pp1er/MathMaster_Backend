const cousrserepo = require('../database/courserepository')
const authorrepo = require('../database/authorrepository')
const editrequestrepo = require('../database/editrequestrepository')

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

const getUnpublishedEditRequests = async (req, res) => {
  try {
    if (req.user.role !== 'moderator') {
      throw new Error('You are not authorized to perform this action')
    }
    const unpublishedEditRequests = await editrequestrepo.getUnpublishedEditRequests()
    res.send(unpublishedEditRequests)
  } catch (error) {
    res.status(500).send({ message: 'Error retrieving the unpublished edit requests' + error.message, status: 'failed' })
  }
}

const getPublishedEditRequests = async (req, res) => {
  try {
    if (req.user.role !== 'moderator') {
      throw new Error('You are not authorized to perform this action')
    }
    const publishedEditRequests = await editrequestrepo.getPublishedEditRequests()
    res.send(publishedEditRequests)
  } catch (error) {
    res.status(500).send({ message: 'Error retrieving the published edit requests' + error.message, status: 'failed' })
  }
}

const getEditRequestById = async (req, res) => {
  try {
    if (req.user.role !== 'moderator') {
      throw new Error('You are not authorized to perform this action')
    }
    const editRequestId = parseInt(req.params.editRequestId, 10) // Typecast to integer
    const editRequest = await editrequestrepo.getEditRequestById(editRequestId)
    res.send(editRequest)
  } catch (error) {
    res.status(500).send({ message: 'Error retrieving the edit request' + error.message, status: 'failed' })
  }
}

const publishContent = async (req, res) => {
  try {
    if (req.user.role !== 'moderator') {
      throw new Error('You are not authorized to perform this action')
    }
    const editRequestId = parseInt(req.params.editRequestId, 10) // Typecast to integer
    const editRequest = await editrequestrepo.publishContent(editRequestId, req.user.userId)
    res.send({ editRequest, status: 'success', message: 'Content published successfully' })
  } catch (error) {
    res.status(500).send({ message: 'Error publishing the content' + error.message, status: 'failed' })
  }
}

const addmoderatorfeedback = async (req, res) => {
  try {
    if (req.user.role !== 'moderator') {
      throw new Error('You are not authorized to perform this action')
    }
    const editRequestId = parseInt(req.params.editRequestId, 10) // Typecast to integer
    const feedback = req.body.feedback
    const editRequest = await editrequestrepo.addmoderatorfeedback(editRequestId, feedback, req.user.userId)
    res.send({ editRequest, status: 'success', message: 'Feedback added successfully' })
  } catch (error) {
    res.status(500).send({ message: 'Error adding the feedback' + error.message, status: 'failed' })
  }
}

module.exports = {
  addCourse,
  addAuthorizedAuthor,
  searchAuthorByName,
  getUnpublishedEditRequests,
  getPublishedEditRequests,
  getEditRequestById,
  publishContent,
  addmoderatorfeedback
}
