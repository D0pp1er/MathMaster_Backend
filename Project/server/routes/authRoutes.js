const express = require('express')
const router = express.Router()
/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: APIs for user authentication
 */

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: User signup
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Signup successful
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /uniqueUserName:
 *   get:
 *     summary: Check for unique username
 *     tags: [Authentication]
 *     parameters:
 *       - in: query
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Username is unique
 *       500:
 *         description: Internal server error
 */

router.post('/signup', (req, res) => {
  res.send('signup')
})

router.post('/login', (req, res) => {
  res.send('logging in')
})

router.get('/uniqueUserName', (req, res) => {
  res.send('Checking for unique username')
})

module.exports = router
