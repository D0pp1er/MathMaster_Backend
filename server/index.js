// dependencies
const path = require('path')
const dotenv = require('dotenv')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')

require('dotenv').config()
// routes
const courseRoutes = require('./routes/courseRoutes')
const lessonRoutes = require('./routes/lessonRoutes')
const authRoutes = require('./routes/authRoutes')
const definitionRoutes = require('./routes/definitionRoutes')
const quizRoutes = require('./routes/quizRoutes')
const statRoutes = require('./routes/statRoutes')
const authorRoutes = require('./routes/authorRoutes')
const moderatorRoutes = require('./routes/modRoutes')
const topicRoutes = require('./routes/topicRoutes')

// swagger api documentation
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

dotenv.config({ path: path.join(__dirname, '.env') })

// const pool = require(path.join(__dirname, '/config/db.config.js'))

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors(
  {
    origin: 'http://localhost:5173',
    credentials: true,
    exposeHeaders: ['set-cookie']
  })
)
app.use((req, res, next) => {
  if (req.url.startsWith('/api/auth/')) {
    next()
  } else {
    const token = req.cookies.token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        res.status(500).send('not authenticated')
      } else {
        req.user = user
        next()
      }
    })
  }
})

const PORT = process.env.PORT || 9000

// Functions
// const getProducts = (req, res) => {
//   pool.query('SELECT * FROM products', (error, products) => {
//     if (error) {
//       console.log(error)
//       throw error
//     }
//     res.status(200).json(products.rows)
//   })
// }

// Here you can add your routes
// Here's an example
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// app.get('/products', getProducts)

// main routes
app.use('/api/courses', courseRoutes)
app.use('/api/lessons', lessonRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/definitions', definitionRoutes)
app.use('/api/quizzes', quizRoutes)
app.use('/api/stats', statRoutes)
app.use('/api/author', authorRoutes)
app.use('/api/mod', moderatorRoutes)
app.use('/api/topics', topicRoutes)

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation for Math-Master',
      version: '1.0.0',
      description: 'An interactive math learning platform '
    },
    servers: [
      {
        url: 'https://math-master.azurewebsites.net/'
      },
      {
        url: `http://localhost:${PORT}`
      }
    ]
  },
  apis: ['./routes/*.js']
}

const swaggerSpec = swaggerJSDoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.listen(PORT, () => {
  console.log(`Server listening on the port  ${PORT}`)
})
