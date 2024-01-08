const express = require('express')
const router = express.Router()
/**
 * @swagger
 * tags:
 *   name: Lessons
 *   description: API endpoints for managing lessons
 */

/**
 * @swagger
 * /lessons/{lessonId}:
 *   get:
 *     summary: Get a lesson
 *     tags: [Lessons]
 *     parameters:
 *       - in: path
 *         name: lessonId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the lesson
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *       404:
 *         description: Lesson not found
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */

/**
 * @swagger
 * /lessons:
 *   post:
 *     summary: Create a new lesson
 *     tags: [Lessons]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */

/**
 * @swagger
 * /lessons/rateLesson/{lessonId}:
 *   post:
 *     summary: Rate a lesson
 *     tags: [Lessons]
 *     parameters:
 *       - in: path
 *         name: lessonId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the lesson
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */

/**
 * @swagger
 * /lessons/completeLesson/{lessonId}:
 *   post:
 *     summary: Complete a lesson
 *     tags: [Lessons]
 *     parameters:
 *       - in: path
 *         name: lessonId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the lesson
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */

/**
 * @swagger
 * /lessons/{lessonId}:
 *   patch:
 *     summary: Update an existing lesson
 *     tags: [Lessons]
 *     parameters:
 *       - in: path
 *         name: lessonId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the lesson
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *       404:
 *         description: Lesson not found
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */

/**
 * @swagger
 * /lessons/{lessonId}:
 *   delete:
 *     summary: Delete an existing lesson
 *     tags: [Lessons]
 *     parameters:
 *       - in: path
 *         name: lessonId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the lesson
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *       404:
 *         description: Lesson not found
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */

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
