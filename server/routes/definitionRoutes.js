const express = require('express')
const router = express.Router()
const definitioncontroller = require('../controllers/definitionController')
/**
 * @swagger
 * tags:
 *   name: Definitions
 *   description:
 */
/**
 * @swagger
 * /api/definitions/:
 *   get:
 *     summary: Get all definitions
 *     tags: [Definitions]
 *     responses:
 *       200:
 *         description: An array of definitions
 *         response-body:
 *         content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      definitions:
 *                          type: array
 *                          items:
 *                             type: object
 *                             properties:
 *                                id:
 *                                  type: integer
 *                                  example: 123
 *                                name:
 *                                  type: string
 *                                  example: Linear Function
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
 * /api/definitions/{definitionId}:
 *   get:
 *     summary: Get a definition by id
 *     tags: [Definitions]
 *     parameters:
 *       - in: path
 *         name: definitionId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the definition
 *     responses:
 *       200:
 *         description: Definition of the given ID
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
 *                    example: Linear Function
 *                  content:
 *                   type: string
 *                   example: In mathematics, a linear function is a function that satisfies the properties of additivity and homogeneity.
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
 * /api/definitions/{definitionId}/update:
 *   patch:
 *     summary: Update an existing definition
 *     tags: [Definitions]
 *     parameters:
 *       - in: path
 *         name: definitionId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the definition
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
 *              LessonId:
 *                type: integer
 *                example: 1
 *              DefinitionId:
 *                  type: integer
 *                  example: 1
 *              name:
 *                  type: string
 *                  example: Linear Function
 *              content:
 *                  type: string
 *                  example: In mathematics, a linear function is a function that satisfies the properties of additivity and homogeneity.
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
 * /api/definitions/create:
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
 *              - LessonId
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
 *              LessonId:
 *                 type: integer
 *                 example: 1
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
 * /api/definitions/{definitionId}/delete:
 *   delete:
 *     summary: Delete an existing definition
 *     tags: [Definitions]
 *     parameters:
 *       - in: path
 *         name: definitionId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the definition
 *     responses:
 *       200:
 *         description: Deleted a definition
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                    type: string
 *                    example: Deleted a definition
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
 * /api/definitions/{definitionId}/publish:
 *   post:
 *     summary: Publish a definition
 *     tags: [Definitions]
 *     parameters:
 *       - in: path
 *         name: definitionId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the definition
 *     responses:
 *       200:
 *         description: Published a definition
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                    type: string
 *                    example: Published a definition
 *       401:
 *         description: Unauthorized, Invalid username or password, or user not found
 *       403:
 *         description: Forbidden route
 *       404:
 *         description: Invalid route/User not found
 *       500:
 *         description: Internal Server Error
 */

// GET all definitions
router.get('/', definitioncontroller.getAllDefinitions)

// GET a particular definition by id
router.get('/:definitionId', definitioncontroller.getDefinitionById)

// UPDATE a definition by id
router.put('/:definitionId/update', (req, res) => {
  const definitionId = req.params.definitionId
  // Logic to update a definition by id in the database
  // ...
  res.send(`Update definition with id ${definitionId}`)
})
// CREATE a new definition
router.post('/create', (req, res) => {
  // Logic to create a new definition in the database
  // ...
  res.send('Create a new definition')
})
// DELETE a definition by id
router.delete('/:definitionId/delete', (req, res) => {
  const definitionId = req.params.definitionId
  // Logic to delete a definition by id from the database
  // ...
  res.send(`Delete definition with id ${definitionId}`)
})
// Publish a definition by id
router.post('/:definitionId/publish', (req, res) => {
  const definitionId = req.params.definitionId
  // Logic to publish a definition by id in the database
  // ...
  res.send(`Publish definition with id ${definitionId}`)
})
module.exports = router
