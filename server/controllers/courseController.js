// Import from database
const courserepository = require('../database/courserepository')

// Function to get all courses
const getAllCourses = async (req, res) => {
  try {
    const courses = await courserepository.getAllCourses(2)
    // console.log(req.user)
    // console.log(courseNames)
    res.send(courses)
  } catch (error) {
    res.status(500).send('Error getting all courses: ' + error.message)
  }
}

// Function to get a specific course by ID
const getCourseById = async (req, res) => {
  // console.log('\ncourse id is', req.params.courseId)

  try {
    const courseId = parseInt(req.params.courseId, 10) // Typecast to integer
    // getcoursebyid takes input of userId, courseId
    const course = await courserepository.getCourseById(2, courseId)

    res.send(course)
  } catch (error) {
    res.status(500).send('Error getting the course: ' + error.message)
  }
}

// Function to get the course outline
const getCourseOutline = async (req, res) => {
  try {
    const courseId = parseInt(req.params.courseId, 10) // Typecast to integer
    // getcoursebyid takes input of userId, courseId, and language
    const course = await courserepository.getCourseOverallOutlinebyID(2, courseId)

    res.send(course)
  } catch (error) {
    res.status(500).send('Error getting the course overall outline: ' + error.message)
  }
}

// Function to create a new course
const createCourse = (req, res) => {
  // Your code here
}

// Function to enroll in a course
const enrollCourse = async (req, res) => {
  // Your code here
  const courseId = parseInt(req.params.courseId, 10) // Typecast to integer
  // const userId = req.body.userId // Assuming userId is provided in the request body
  try {
    // Call the enrollCourse function from the courserepository
    // await courserepository.enrollCourse(userId, courseId)
    await courserepository.enrollCourse(2, courseId)

    res.send('Enrollment successful')
  } catch (error) {
    res.status(500).send('Error enrolling in the course' + error.message)
  }
}

// Function to rate a course
const rateCourse = async (req, res) => {
  const courseId = parseInt(req.params.courseId, 10) // Typecast to integer
  // const rating = req.body.rating // Assuming rating is provided in the request body
  // const userId = req.body.userId // Assuming userId is provided in the request body

  try {
    // Call the rateCourse function from the courserepository
    // await courserepository.rateCourse(userId, courseId, rating)
    // console.log(req.body)
    const userRating = req.body.rating
    // console.log('Rating is', userRating)
    await courserepository.rateCourse(2, courseId, userRating)

    res.send('Course rated successfully')
  } catch (error) {
    res.status(500).send('Error rating the course' + error.message)
  }
}

// Function to update a course by ID
const updateCourseById = (req, res) => {
  // Your code here
}

// Function to delete a course by ID
const deleteCourseById = (req, res) => {
  // Your code here
}

const publishCourse = (req, res) => {
  // Your code here
}

// Export the functions
module.exports = {
  getAllCourses,
  getCourseById,
  getCourseOutline,
  createCourse,
  enrollCourse,
  rateCourse,
  updateCourseById,
  deleteCourseById,
  publishCourse
}
