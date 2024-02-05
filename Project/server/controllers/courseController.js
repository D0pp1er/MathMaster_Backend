// Import from database
const courserepository = require('../database/courserepository')

// Function to get all courses
const getAllCourses = async (req, res) => {
  const courses = await courserepository.getAllCourses(3, 'English')
  // console.log(courseNames)
  res.send(courses)
}

// Function to get a specific course by ID
const getCourseById = async (req, res) => {
  // console.log('\ncourse id is', req.params.courseId)

  const courseId = parseInt(req.params.courseId, 10) // Typecast to integer
  // getcoursebyid takes input of userId, courseId, and language
  const course = await courserepository.getCourseById(3, courseId, 'English')

  res.send(course)
}

// Function to get the course outline
const getCourseOutline = (req, res) => {
  // Your code here
}

// Function to create a new course
const createCourse = (req, res) => {
  // Your code here
}

// Function to enroll in a course
const enrollCourse = (req, res) => {
  // Your code here
}

// Function to rate a course
const rateCourse = (req, res) => {
  // Your code here
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
