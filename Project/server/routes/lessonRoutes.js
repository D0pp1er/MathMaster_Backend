const express = require('express')
const router = express.Router()
/**
 * @swagger
 * tags:
 *   name: Lessons
 *   description:
 */

/**
 * @swagger
 * /api/lessons/{lessonId}:
 *   get:
 *     summary: Get a lesson
 *     tags: [Lessons]
 *     parameters:
 *       - in: path
 *         name: lessonId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the lesson
 *     responses:
 *       200:
 *         description: Lesson of the given ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  id:
 *                   type: integer
 *                   example: 1
 *                  name:
 *                    type: string
 *                    example: Lesson 1
 *                  content:
 *                   type: string
 *                   example: This is the content of lesson 1
 *                  isCompleted:
 *                    type: boolean
 *                    example: false
 *                  upvotes:
 *                    type: boolean
 *                    example: true
 *                  author:
 *                    type: object
 *                    properties:
 *                        id:
 *                         type: integer
 *                         example: 1
 *                        name:
 *                          type: string
 *                          example: Shariful Rahi
 *
 *
 *
 *
 *       401:
 *         description: Unauthorized, Invalid username or password, or user not found
 *       403:
 *         description: Forbidden route
 *       404:
 *         description: Invalid route/User not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/lessons/create:
 *   post:
 *     summary: Create a new lesson
 *     tags: [Lessons]
 *     requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *          type: object
 *          required:
 *              - AuthorId
 *              - CourseId
 *              - TopicId
 *              - language
 *              - name
 *              - content
 *          properties:
 *              AuthorId:
 *                  type: integer
 *                  example: 1
 *              CourseId:
 *                  type: integer
 *                  example: 1
 *              TopicId:
 *                  type: integer
 *                  example: 10
 *              language:
 *                  type: string
 *                  example: English
 *              name:
 *                  type: string
 *                  example: Algebra 1
 *              content:
 *                  type: string
 *                  example: "Here's the lesson"
 *     responses:
 *       200:
 *         description: Successfully created a new lesson
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                    type: string
 *                    example: Successfully created a new lesson
 *       401:
 *         description: Unauthorized, Invalid username or password, or user not found
 *       403:
 *         description: Forbidden route
 *       404:
 *         description: Invalid route/User not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/lessons/{lessonId}/upvote:
 *   post:
 *     summary: like or upvote a lesson
 *     tags: [Lessons]
 *     parameters:
 *       - in: path
 *         name: lessonId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the lesson
 *     requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *          type: object
 *          required:
 *              - upvote
 *          properties:
 *              upvote:
 *                  type: boolean
 *                  example : true
 *
 *     responses:
 *       200:
 *         description: Successfully upvoted a lesson
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                    type: string
 *                    example: Successfully upvoted a lesson
 *       401:
 *         description: Unauthorized, Invalid username or password, or user not found
 *       403:
 *         description: Forbidden route
 *       404:
 *         description: Invalid route/User not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/lessons/{lessonId}/complete:
 *   post:
 *     summary: Complete a lesson
 *     tags: [Lessons]
 *     parameters:
 *       - in: path
 *         name: lessonId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the lesson
 *     responses:
 *       200:
 *         description: Completed a lesson
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                    type: string
 *                    example: Completed a lesson
 *       401:
 *         description: Unauthorized, Invalid username or password, or user not found
 *       403:
 *         description: Forbidden route
 *       404:
 *         description: Invalid route/User not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/lessons/{lessonId}/update:
 *   patch:
 *     summary: Update an existing lesson
 *     tags: [Lessons]
 *     parameters:
 *       - in: path
 *         name: lessonId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the lesson
*     requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *          type: object
 *          required:
 *              - AuthorId
 *          properties:
 *              AuthorId:
 *                  type: integer
 *                  example: 1
 *              CourseId:
 *                  type: integer
 *                  example: 1
 *              TopicId:
 *                  type: integer
 *                  example: 10
 *              language:
 *                  type: string
 *                  example: English
 *              name:
 *                  type: string
 *                  example: Algebra 1
 *              content:
 *                  type: string
 *                  example: "Here's the updated lesson"
 *     responses:
 *       200:
 *         description: Updated a lesson
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                    type: string
 *                    example: Updated a lesson
 *       401:
 *         description: Unauthorized, Invalid username or password, or user not found
 *       403:
 *         description: Forbidden route
 *       404:
 *         description: Invalid route/User not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/lessons/{lessonId}/delete:
 *   delete:
 *     summary: Delete an existing lesson
 *     tags: [Lessons]
 *     parameters:
 *       - in: path
 *         name: lessonId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the lesson
 *     responses:
 *       200:
 *         description: Deleted a lesson
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                    type: string
 *                    example: Deleted a lesson
 *       401:
 *         description: Unauthorized, Invalid username or password, or user not found
 *       403:
 *         description: Forbidden route
 *       404:
 *         description: Invalid route/User not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/lessons/{lessonId}/publish:
 *   post:
 *     summary: Publish a lesson
 *     tags: [Lessons]
 *     parameters:
 *       - in: path
 *         name: lessonId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the lesson
 *     responses:
 *       200:
 *         description: Published a lesson
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                    type: string
 *                    example: Published a lesson
 *       401:
 *         description: Unauthorized, Invalid username or password, or user not found
 *       403:
 *         description: Forbidden route
 *       404:
 *         description: Invalid route/User not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/:lessonId', (req, res) => {
  res.send('Get a lesson')
})

router.post('/create', (req, res) => {
  res.send('Create a new lesson')
})

router.post('/:lessonId/rate', (req, res) => {
  res.send('rate a lesson')
})

router.post('/:lessonId/complete', (req, res) => {
  res.send('complete a lesson')
})

router.post('/:lessonId/publish', (req, res) => {
  res.send('publish a lesson')
})

router.patch('/:lessonId/update', (req, res) => {
  res.send('Update an existing lesson')
})

router.delete('/:lessonId/delete', (req, res) => {
  res.send('Delete an existing lesson')
})

module.exports = router
