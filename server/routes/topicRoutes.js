const express = require('express')
const router = express.Router()
const topicController = require('../controllers/topicController')

router.get('/:topicId', topicController.getTopicById)
router.patch('/:topicId/update', topicController.editTopic)
module.exports = router
