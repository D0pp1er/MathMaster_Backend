const express = require('express')
const router = express.Router()
/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: API endpoints for courses
 */

/**
 * @swagger
 * /courses:
 *   get:
 *     summary: Get all courses
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *   post:
 *     summary: Create a new course
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */

/**
 * @swagger
 * /courses/{courseId}:
 *   get:
 *     summary: Get an existing course
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         description: ID of the course
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *   patch:
 *     summary: Update an existing course
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         description: ID of the course
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *   delete:
 *     summary: Delete an existing course
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         description: ID of the course
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */

/**
 * @swagger
 * /courses/courseOutline/{courseId}:
 *   get:
 *     summary: Get an existing course outline
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         description: ID of the course
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */

/**
 * @swagger
 * /courses/enrollCourse/{courseId}:
 *   post:
 *     summary: Enroll in a new course
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         description: ID of the course
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */

/**
 * @swagger
 * /courses/rateCourse/{courseId}:
 *   post:
 *     summary: Rate a course
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         description: ID of the course
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */
module.exports = router

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
