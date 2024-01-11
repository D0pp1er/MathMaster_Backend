const express = require('express');
const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Statistics
 *   description: 
 */

/**
 * @swagger
 * /api/stats/user/{userId}:
 *   get:
 *     summary: Get statistics of a user
 *     tags: [Statistics]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: Statistics of the given user
 *         response-body:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  name:
 *                   type: string
 *                   example: John Doe
 *                  Joined:
 *                    type: string
 *                    example: 2021-01-01
 *                  totalXp:
 *                   type: integer
 *                   example: 100
 *                  dailyXp:
 *                   type: array
 *                   items:
 *                     type: integer
 *                     example: 10, 10, 0, 15
 *                  enrolledCourses:
 *                     type: integer
 *                     example: 5
 *                  problemsSolved:
 *                      type: integer
 *                      example: 10
 *                  lessonsCompleted:
 *                     type: integer
 *                     example: 20
 *                  completedCourses:
 *                    type: integer
 *                    example: 2
 *       401:
 *         description: Unauthorized, Invalid username or password, or user not found
 *       403:
 *         description: Forbidden route
 *       404:
 *         description: Invalid route/User not found
 *       500:
 *         description: Internal Server Error
 */

router.get('/user/:userId', (req, res) => {
    // Logic to fetch all stats from the database
    // ...
    res.send('Get user stats');
});

/**
 * @swagger
 * /api/stats/author/{authorId}:
 *   get:
 *     summary: Get statistics of an author
 *     tags: [Statistics]
 *     parameters:
 *       - in: path
 *         name: authorId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the author
 *     responses:
 *       200:
 *         description: Statistics of the given author
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  name:
 *                   type: string
 *                   example: John Doe
 *                  Joined:
 *                    type: string
 *                    example: 2021-01-01
 *                  LessonCreated:
 *                    type: integer
 *                    example: 100
 *                  QuizCreated:
 *                      type: integer
 *                      example: 10
 *                  DefinitionCreated:
 *                    type: integer
 *                    example: 20
 *                  CourseCreated:
 *                   type: integer
 *                   example: 5
 *                  lessonStats:
 *                    type : array
 *                    items:
 *                     type: object
 *                     properties:
 *                         lessonId:
 *                             type: integer
 *                             example: 1
 *                         lessonName:
 *                             type: string
 *                             example: Algebra
 *                         lessonEngagement:
 *                             type: integer
 *                             example: 10
 *                         lessonUpvotes:
 *                             type: integer
 *                             example: 5
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

router.get('/author/:authorId', (req, res) => {
    // Logic to fetch all stats from the database
    // ...
    res.send('Get author stats');
});


/**
 * @swagger
 * /api/stats/moderator/{moderatorId}:
 *   get:
 *     summary: Get statistics of an moderator
 *     tags: [Statistics]
 *     parameters:
 *       - in: path
 *         name: moderatorId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the moderator
 *     responses:
 *       200:
 *         description: Statistics of the given moderator
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  name:
 *                   type: string
 *                   example: John Doe
 *                  Joined:
 *                    type: string
 *                    example: 2021-01-01
 *                  LessonPublished:
 *                    type: integer
 *                    example: 100
 *                  QuizPublished:
 *                      type: integer
 *                      example: 10
 *                  DefinitionPublished:
 *                    type: integer
 *                    example: 20
 *                  CoursePublished:
 *                   type: integer
 *                   example: 5
 *                  lessonStats:
 *                    type : array
 *                    items:
 *                     type: object
 *                     properties:
 *                         lessonId:
 *                             type: integer
 *                             example: 1
 *                         lessonName:
 *                             type: string
 *                             example: Algebra
 *                         lessonEngagement:
 *                             type: integer
 *                             example: 10
 *                         lessonUpvotes:
 *                             type: integer
 *                             example: 5
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

router.get('/moderator/:moderatorId', (req, res) => {
    // Logic to fetch all stats from the database
    // ...
    res.send('Get moderator stats');
});


module.exports = router;
