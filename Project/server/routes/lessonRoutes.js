const express = require('express')
const router = express.Router()

router.get('/:lessonId', (req, res) => {
  res.send('Get a lesson')
})

router.post('/', (req, res) => {
  res.send('Create a new lesson')
})

router.post('/rateLesson/:lessonId', (req, res) => {
  res.send('rate a lesson')
})

router.post('/completeLesson/:lessonId', (req, res) => {
  res.send('complete a lesson')
})

router.patch('/:lessonId', (req, res) => {
  res.send('Update an existing lesson')
})

router.delete('/:lessonId', (req, res) => {
  res.send('Delete an existing lesson')
})

module.exports = router
