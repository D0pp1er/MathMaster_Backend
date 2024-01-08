const express = require('express')
const courseController = require('../controllers/courseController')
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

router.get('/', courseController.getAllCourses)

router.get('/:courseId', courseController.getCourseById)

router.get('/courseOutline/:courseId', courseController.getCourseOutline)

router.post('/', courseController.createCourse)

router.post('/enrollCourse/:courseId', courseController.enrollCourse)

router.post('/rateCourse/:courseId', courseController.rateCourse)

router.patch('/:courseId', courseController.updateCourseById)

router.delete('/:courseId', courseController.deleteCourseById)

module.exports = router
