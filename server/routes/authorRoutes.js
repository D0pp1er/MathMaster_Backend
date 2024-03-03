const express = require('express')
const router = express.Router()
const authorcontroller = require('../controllers/authorController')

router.get('/lessons/:lessonId', authorcontroller.getLessonById)
router.patch('/course/:courseId/editoutline', authorcontroller.editCourse)
router.get('/unpublished', authorcontroller.getUnpublishedEditRequestForAuthor)

module.exports = router
