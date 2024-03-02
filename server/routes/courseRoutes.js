const express = require('express')
const courseController = require('../controllers/courseController')
const authorController = require('../controllers/authorController')
const router = express.Router()

/**
 * @swagger
 * tags:
 *  name: Course
 *  description:
 */

/**
 * @swagger
 * /api/courses/:
 *   get:
 *     summary: Get all courses
 *     tags: [Course]
 *     responses:
 *       200:
 *         description: An array of courses
 *         response-body:
 *         content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      courses:
 *                          type: array
 *                          items:
 *                             type: object
 *                             properties:
 *                                id:
 *                                  type: integer
 *                                  example: 123
 *                                name:
 *                                  type: string
 *                                  example: Algebra 1
 *                                type:
 *                                  type: string
 *                                  example: Algebra
 *                                esmitatedTime:
 *                                  type: integer
 *                                  example: 24
 *                                difficulty:
 *                                  type: string
 *                                  example: Hard
 *                                image:
 *                                  type: string
 *                                  example: 'public/assets/images/algebra.jpg'
 *                                description:
 *                                  type: string
 *                                  example: 'Algebra is a branch of mathematics dealing with symbols and the rules for manipulating those symbols. In elementary algebra, those symbols (today written as Latin and Greek letters) represent quantities without fixed values, known as variables. Just as sentences describe relationships between specific words, in algebra, equations describe relationships between variables.'
 *                                authors:
 *                                 type: array
 *                                 items:
 *                                  type: object
 *                                  properties:
 *                                      AuthorId:
 *                                         type: integer
 *                                         example: 1
 *                                      name:
 *                                        type: string
 *                                        example: Asib Rahman
 *                                lessonCount:
 *                                  type: integer
 *                                  example: 10
 *                                quizCount:
 *                                  type: integer
 *                                  example: 5
 *                                completetionPercentage:
 *                                  type: integer
 *                                  example: 80
 *                                isEnrolled:
 *                                  type: boolean
 *                                  example: true
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
 * /api/courses/{courseId}:
 *   get:
 *     summary: Get a course by ID
 *     tags: [Course]
 *     parameters:
 *       - name: courseId
 *         in: path
 *         required: true
 *         description: ID of the course
 *         schema:
 *           type: integer
 *           example: 12
 *     responses:
 *       200:
 *         description: Course of given ID
 *         response-body:
 *         content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                                id:
 *                                  type: integer
 *                                  example: 123
 *                                name:
 *                                  type: string
 *                                  example: Algebra 1
 *                                image:
 *                                  type: string
 *                                  example: 'public/assets/images/algebra.jpg'
 *                                description:
 *                                  type: string
 *                                  example: 'Algebra is a branch of mathematics dealing with symbols and the rules for manipulating those symbols. In elementary algebra, those symbols (today written as Latin and Greek letters) represent quantities without fixed values, known as variables. Just as sentences describe relationships between specific words, in algebra, equations describe relationships between variables.'
 *                                authors:
 *                                 type: array
 *                                 items:
 *                                  type: object
 *                                  properties:
 *                                      AuthorId:
 *                                         type: integer
 *                                         example: 1
 *                                      name:
 *                                        type: string
 *                                        example: Asib Rahman
 *                                content:
 *                                 type: array
 *                                 items:
 *                                  type: object
 *                                  properties:
 *                                     topic:
 *                                      type: array
 *                                      items:
 *                                         type: object
 *                                         properties:
 *                                           id:
 *                                            type: integer
 *                                            example: 2
 *                                           name:
 *                                            type: string
 *                                            example: 'Algebraic Expressions'
 *                                           lessons:
 *                                            type: array
 *                                            items:
 *                                              type: object
 *                                              properties:
 *                                                  id:
 *                                                      type: integer
 *                                                      example: 1
 *                                                  name:
 *                                                      type: string
 *                                                      example: 'What is Algebra?'
 *                                                  completed:
 *                                                      type: boolean
 *                                                      example: true
 *                                           quizzes:
 *                                            type: array
 *                                            items:
 *                                              type: object
 *                                              properties:
 *                                                  id:
 *                                                      type: integer
 *                                                      example: 1
 *                                                  name:
 *                                                      type: string
 *                                                      example: 'Quiz 1'
 *                                                  completed:
 *                                                      type: boolean
 *                                                      example: false
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
 * /api/courses/{courseId}/outline:
 *   get:
 *     summary: Get the outline of a course
 *     tags: [Course]
 *     parameters:
 *       - name: courseId
 *         in: path
 *         required: true
 *         description: ID of the course
 *         schema:
 *           type: integer
 *           example: 12
 *     responses:
 *       200:
*         description: Course outline of given ID
 *         response-body:
 *         content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                                id:
 *                                  type: integer
 *                                  example: 1
 *                                name:
 *                                  type: string
 *                                  example: Algebra 1
 *                                type:
 *                                  type: string
 *                                  example: Algebra
 *                                difficulty:
 *                                  type: string
 *                                  example: Hard
 *                                esmitatedTime:
 *                                 type: integer
 *                                 example: 24
 *                                image:
 *                                  type: string
 *                                  example: 'public/assets/images/algebra.jpg'
 *                                description:
 *                                  type: string
 *                                  example: 'Algebra is a branch of mathematics dealing with symbols and the rules for manipulating those symbols. In elementary algebra, those symbols (today written as Latin and Greek letters) represent quantities without fixed values, known as variables. Just as sentences describe relationships between specific words, in algebra, equations describe relationships between variables.'
 *                                authors:
 *                                 type: array
 *                                 items:
 *                                  type: object
 *                                  properties:
 *                                      AuthorId:
 *                                         type: integer
 *                                         example: 1
 *                                      name:
 *                                        type: string
 *                                        example: Asib Rahman
 *                                lessonCount:
 *                                 type: integer
 *                                 example: 10
 *                                quizCount:
 *                                 type: integer
 *                                 example: 5
 *                                lessoncompletetionPercentage:
 *                                  type: integer
 *                                  example: 80
 *                                quizcompletetionPercentage:
 *                                 type: integer
 *                                 example: 80
 *                                totalenrolled:
 *                                  type: integer
 *                                  example: 500
 *                                ratings:
 *                                  type: array
 *                                  items:
 *                                   type: object
 *                                   properties:
 *                                     1:
 *                                      type: integer
 *                                      example: 5
 *                                     2:
 *                                      type: integer
 *                                      example: 10
 *                                     3:
 *                                      type: integer
 *                                      example: 30
 *                                     4:
 *                                      type: integer
 *                                      example: 50
 *                                     5:
 *                                      type: integer
 *                                      example: 20
 *                                isEnrolled:
 *                                  type: boolean
 *                                  example: true
 *                                myRating:
 *                                  type: integer
 *                                  example: 5
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
 * /api/courses/create:
 *   post:
 *     summary: Create a new course
 *     tags: [Course]
 *     requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *          type: object
 *          required:
 *              - AuthorId
 *              - PrerequisiteCourseId
 *              - language
 *              - name
 *              - courseType
 *              - difficulty
 *              - image
 *              - description
 *          properties:
 *              AuthorId:
 *                  type: integer
 *                  example: 1
 *              PrerequisiteCourseId:
 *                  type: integer
 *                  example: 1
 *              language:
 *                  type: string
 *                  example: English
 *              name:
 *                  type: string
 *                  example: Algebra 1
 *              courseType:
 *                  type: string
 *                  example: Algebra
 *              difficulty:
 *                  type: string
 *                  example: Hard
 *              image:
 *                  type: string
 *                  example: 'public/assets/images/algebra.jpg'
 *              description:
 *                  type: string
 *                  example: 'Algebra is a branch of mathematics'
 *
 *
 *
 *
 *     responses:
 *       200:
 *        description: Success
 *        response-body:
 *        content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 *                          default: Course created successfully
 *       401:
 *         description: Unauthorized, Invalid username or password, or user not found
 *       403:
 *         description: Forbidden route
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/courses/{courseId}/enroll:
 *   post:
 *     summary: Enroll in a course
 *     tags: [Course]
 *     parameters:
 *       - name: courseId
 *         in: path
 *         required: true
 *         description: ID of the course
 *         schema:
 *           type: integer
 *           example: 12
 *
 *
 *     responses:
 *       200:
 *         description: Success
 *         response-body:
 *         content:
 *          application/json:
 *              schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     default: Course enrolled successfully
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
 * /api/courses/{courseId}/rate:
 *   post:
 *     summary: Rate a course
 *     tags: [Course]
 *     parameters:
 *       - name: courseId
 *         required: true
 *         description: ID of the course
 *         type: integer
  *     requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *          type: object
 *          required:
 *              - rating
 *          properties:
 *               rating:
 *                   type: integer
 *                   example: 5
 *     responses:
 *       200:
 *         description: Success
 *         response-body:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   default: Course rated successfully
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
 * /api/courses/{courseId}/update:
 *   patch:
 *     summary: Update a course by ID
 *     tags: [Course]
 *     parameters:
 *       - name: courseId
 *         in: path
 *         required: true
 *         description: ID of the course
 *         schema:
 *           type: string
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
 *              PrerequisiteCourseId:
 *                  type: integer
 *                  example: 1
 *              language:
 *                  type: string
 *                  example: English
 *              name:
 *                  type: string
 *                  example: Algebra 1
 *              courseType:
 *                  type: string
 *                  example: Algebra
 *              difficulty:
 *                  type: string
 *                  example: Easy
 *              image:
 *                  type: string
 *                  example: 'public/assets/images/algebra.jpg'
 *              description:
 *                  type: string
 *                  example: 'Algebra is a branch of mathematics dealing with symbols and the rules for manipulating those symbols. In elementary algebra, those symbols (today written as Latin and Greek letters) represent quantities without fixed values, known as variables. Just as sentences describe relationships between specific words, in algebra, equations describe relationships between variables.'
 *     responses:
 *       200:
 *         description: Success
 *         response-body:
 *         content:
 *          application/json:
 *              schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     default: Course updated successfully
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
 * /api/courses/{courseId}/delete:
 *   delete:
 *     summary: Delete a course by ID
 *     tags: [Course]
 *     parameters:
 *       - name: courseId
 *         in: path
 *         required: true
 *         description: ID of the course
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success
 *         response-body:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   default: Course deleted successfully
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
 * /api/courses/{courseId}/publish:
 *   post:
 *     summary: Publish a course
 *     tags: [Course]
 *     parameters:
 *       - name: courseId
 *         in: path
 *         required: true
 *         description: ID of the course
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success
 *         response-body:
 *         content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     default: Course published successfully
 *       401:
 *         description: Unauthorized, Invalid username or password, or user not found
 *       403:
 *         description: Forbidden route
 *       404:
 *         description: Invalid route/User not found
 *       500:
 *         description: Internal Server Error
 */

router.get('/', courseController.getAllCourses)
// done
router.get('/:courseId', courseController.getCourseById)
//  done
router.get('/:courseId/outline', courseController.getCourseOutline)
//  done
router.post('/:courseId/rate', courseController.rateCourse)
// done
router.post('/:courseId/enroll', courseController.enrollCourse)
//  done
// router.post('/create', courseController.createCourse)
// router.delete('/:courseId/delete', courseController.deleteCourseById)
// router.patch('/:courseId/update', courseController.updateCourseById)
// router.post('/:courseId/publish', courseController.publishCourse)

router.post('/:courseId/addTopic', authorController.addTopicOfCourse)

module.exports = router
