const express = require('express')
const router = express.Router()

const modController = require('../controllers/modController')

router.post('/addcourse', modController.addCourse)
router.post('/addAuthorizedAuthor/:courseId', modController.addAuthorizedAuthor)

router.get('/author', modController.searchAuthorByName)

router.get('/editrequests/unpublished', modController.getUnpublishedEditRequests)
router.get('/editrequests/published', modController.getPublishedEditRequests)
router.get('/editrequests/:editRequestId', modController.getEditRequestById)
router.patch('/editrequests/:editRequestId/publish', modController.publishContent)

module.exports = router
