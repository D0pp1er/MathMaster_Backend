const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.send('Get all courses')
})

router.get('/:courseId', (req, res) => {
  res.send('Get an existing course')
})

router.get('/courseOutline/:courseId', (req, res) => {
  res.send('Get an existing course outline')
})

router.post('/', (req, res) => {
  res.send('Create a new course')
})

router.post('/enrollCourse/:courseId', (req, res) => {
  res.send('enroll a new course')
})

router.post('/rateCourse/:courseId', (req, res) => {
  res.send('rate a course')
})

router.patch('/:courseId', (req, res) => {
  res.send('Update an existing course')
})

router.delete('/:courseId', (req, res) => {
  res.send('Delete an existing course')
})

module.exports = router
