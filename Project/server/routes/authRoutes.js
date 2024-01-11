const express = require('express')
const router = express.Router()
/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: 
 */

/**
 * @swagger
 * /api/auth/signup:
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
 *         response-body:
 *         content:
 *           application/json:
 *            schema:
 *             type: object
 *             properties:
 *              message:
 *                type: string
 *                default: Signup successful
 *       401:
 *          description: Unauthorized, Invalid email 
 *       403:
 *          description: Forbidden route
 *       404:
 *          description: Invalid route/User not found
 *          
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /api/auth/login:
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
 *         response-body:
 *         content:
 *           application/json:
 *            schema:
 *             type: object
 *             properties:
 *              message:
 *                type: string
 *                default: Login successful
 *       401:
 *          description: Unauthorized, Invalid username or password
 *       403:
 *          description: Forbidden route
 *       404:
 *          description: Invalid route/User not found
 *          
 *       500:
 *         description: Internal server error
 */
 
/**
 * @swagger
 * /api/auth/uniqueUserName:
 *   get:
 *     summary: Check for unique username
 *     tags: [Authentication]
 *     parameters:
 *       - in: query
 *         name: username
 *         schema:
 *           type: string
 *           example: john
 *         required: true
 *     responses:
 *       200:
 *         description: Username is unique
 *         response-body:
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                unique:
 *                  type: boolean
 *                  default: true
 *       401:
 *         description: Unauthorized, Invalid username or password
 *       403:
 *         description: Forbidden route
 *       404:
 *         description: Invalid route/User not found
 *       500:
 *         description: Internal server error
 */



// need to add controllers 
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
