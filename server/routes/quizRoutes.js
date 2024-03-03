const express = require('express')
const router = express.Router()
const quizController = require('../controllers/quizController')
const authorController = require('../controllers/authorController')
/**
 * @swagger
 * tags:
 *   name: Quizzes
 *   description:
 */
/**
 * @swagger
 * /api/quizzes/:
 *   get:
 *     summary: Get all quizzes
 *     tags: [Quizzes]
 *     responses:
 *       200:
 *         description: An array of quizzes
 *         response-body:
 *         content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      quizzes:
 *                          type: array
 *                          items:
 *                             type: object
 *                             properties:
 *                                id:
 *                                  type: integer
 *                                  example: 123
 *                                name:
 *                                  type: string
 *                                  example: Quiz 1
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
 * /api/quizzes/{quizId}:
 *   get:
 *     summary: Get a quiz by id
 *     tags: [Quizzes]
 *     parameters:
 *       - in: path
 *         name: quizId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the quiz
 *     responses:
 *       200:
 *         description: Quiz of the given ID
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
 *                    example: Quiz 1
 *                  content:
 *                   type: string
 *                   example: "type mcq question : 1+1 = ? , options : 1,2,3,4 , answer : 2"
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
 * /api/quizzes/{quizId}/update:
 *   patch:
 *     summary: Update an existing quiz
 *     tags: [Quizzes]
 *     parameters:
 *       - in: path
 *         name: quizId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the Quiz
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
 *                 type: integer
 *                 example: 1
 *              TopicId:
 *                type: integer
 *                example: 10
 *              QuizId:
 *                  type: integer
 *                  example: 1
 *              name:
 *                  type: string
 *                  example: Quiz 1
 *              language:
 *                 type: string
 *                 example: English
 *              content:
 *                  type: string
 *                  example: "type mcq question : 1+2 = ? , options : 1,2,3,4 , answer : 3"
 *     responses:
 *       200:
 *         description: Updated a definition
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                    type: string
 *                    example: Updated a definition
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
 * /api/quizzes/create:
 *   post:
 *     summary: Create a new quiz
 *     tags: [Quizzes]
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
 *                  example: "type mcq question : 1+10 = ? , options : 11,12,13,14 , answer : 11"
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
 * /api/quizzes/{quizId}/delete:
 *   delete:
 *     summary: Delete an existing quiz
 *     tags: [Quizzes]
 *     parameters:
 *       - in: path
 *         name: quizId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the quiz
 *     responses:
 *       200:
 *         description: Deleted a quiz
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                    type: string
 *                    example: Deleted a quiz
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
 * /api/quizzes/{quizId}/publish:
 *   post:
 *     summary: Publish a quiz
 *     tags: [Quizzes]
 *     parameters:
 *       - in: path
 *         name: quizId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the quiz
 *     responses:
 *       200:
 *         description: Published a quiz
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                    type: string
 *                    example: Published a quiz
 *       401:
 *         description: Unauthorized, Invalid username or password, or user not found
 *       403:
 *         description: Forbidden route
 *       404:
 *         description: Invalid route/User not found
 *       500:
 *         description: Internal Server Error
 */

// GET all quizzes
router.get('/', (req, res) => {
  // Logic to fetch all quizzes from the database
  // ...
  res.send('Get all quizzes')
})

// GET a particular definition by id
router.get('/:quizId', quizController.getQuizById)

router.patch('/:quizId/update', quizController.editQuiz)

router.post('/:topicId/addQuiz', authorController.addQuizToTopic)

// UPDATE a definition by id
router.put('/:quizId/update', (req, res) => {
  const quizId = req.params.quizId
  // Logic to update a definition by id in the database
  // ...
  res.send(`Update quiz with id ${quizId}`)
})

// CREATE a new quiz
router.post('/create', (req, res) => {
  // Logic to create a new quiz in the database
  // ...
  res.send('Create a new quiz')
})
// DELETE a quiz by id
router.delete('/:quizId/delete', (req, res) => {
  const quizId = req.params.quizId
  // Logic to delete a definition by id from the database
  // ...
  res.send(`Delete quiz with id ${quizId}`)
})

// Publish a definition by id
router.post('/:quizId/publish', (req, res) => {
  const quizId = req.params.quizId
  // Logic to publish a definition by id in the database
  // ...
  res.send(`Publish definition with id ${quizId}`)
})
router.post('/:quizId/submit', quizController.submitquiz)

module.exports = router
