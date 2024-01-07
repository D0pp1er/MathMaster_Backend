const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.send('Get all courses')
})

router.get('/:courseId', (req, res) => {
  res.send('Get an existing course')
})

router.post('/', (req, res) => {
  res.send('Create a new course')
})

router.patch('/:courseId', (req, res) => {
  res.send('Update an existing course')
})

router.delete('/:courseId', (req, res) => {
  res.send('Delete an existing course')
})

module.exports = router
