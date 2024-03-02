const express = require('express')
const router = express.Router()

const modController = require('../controllers/modController')

router.post('/addcourse', modController.addCourse)
router.post('/addAuthorizedAuthor/:courseId', modController.addAuthorizedAuthor)

router.get('/author', modController.searchAuthorByName)

module.exports = router
