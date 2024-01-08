// Function to get all courses
const getAllCourses = (req, res) => {
  // Your code here
//   res.send('get all courses')
  const outline =
        [
          {
            id: 2,
            name: 'Topic1',
            description: 'description1 about the topic Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ullamcorper, tellus eu efficitur commodo, ante lorem tincidunt nunc, et rutrum leo massa non nunc. Cras ut lacinia nulla, ut luctus sem. Mauris non pretium tellus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam dignissim, eros non scelerisque commodo, justo nunc molestie mauris, at aliquet ex nibh quis est. Pellentesque porta dignissim enim viverra feugiat. In hac habitasse platea dictumst. Proin tempor nisi orci, quis cursus ipsum porttitor non. Proin tempor finibus quam, lacinia scelerisque dolor blandit ut. Vivamus vitae elementum enim. Aliquam erat volutpat.',

            completed: true,
            lessons: [
              {
                id: '1',
                name: 'Lesson1',
                completed: true
              },
              {
                id: '2',
                name: 'Lesson2',
                completed: false
              },
              {
                id: '3',
                name: 'Lesson3',
                completed: true
              }
            ],
            quizes: [
              {
                id: '1',
                name: 'Quiz1',
                completed: false
              },
              {
                id: '2',
                name: 'Quiz2',
                completed: true
              }
            ]
          },
          {
            id: 4,
            name: 'Topic2',
            description: 'description2 about the topic Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ullamcorper, tellus eu efficitur commodo, ante lorem tincidunt nunc, et rutrum leo massa non nunc. Cras ut lacinia nulla, ut luctus sem. Mauris non pretium tellus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam dignissim, eros non scelerisque commodo, justo nunc molestie mauris, at aliquet ex nibh quis est. Pellentesque porta dignissim enim viverra feugiat. In hac habitasse platea dictumst. Proin tempor nisi orci, quis cursus ipsum porttitor non. Proin tempor finibus quam, lacinia scelerisque dolor blandit ut. Vivamus vitae elementum enim. Aliquam erat volutpat.',

            completed: false,
            lessons: [
              {
                id: '2',
                name: 'Lesson1',
                completed: true
              },
              {
                id: '3',
                name: 'Lesson2',
                completed: false
              },
              {
                id: '4',
                name: 'lesson3',
                completed: false
              }
            ],
            quizes: [
              {
                id: '1',
                name: 'Quiz3',
                completed: false
              }
            ]
          }
        ]

  const course = {
    id: '1',
    name: 'Course Name 1',
    description: 'description1 about the topic Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ullamcorper, tellus eu efficitur commodo, ante lorem tincidunt nunc, et rutrum leo massa non nunc. Cras ut lacinia nulla, ut luctus sem. Mauris non pretium tellus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam dignissim, eros non scelerisque commodo, justo nunc molestie mauris, at aliquet ex nibh quis est. Pellentesque porta dignissim enim viverra feugiat. In hac habitasse platea dictumst. Proin tempor nisi orci, quis cursus ipsum porttitor non. Proin tempor finibus quam, lacinia scelerisque dolor blandit ut. Vivamus vitae elementum enim. Aliquam erat volutpat.',
    content: outline,
    authors: [
      {
        id: '1',
        name: 'Shariful Rahi'
      },
      {
        id: '2',
        name: 'Rahi Khan'
      }
    ]
  }
  res.json(course)
}

// Function to get a specific course by ID
const getCourseById = (req, res) => {
  res.send('get course by id')
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

// Export the functions
module.exports = {
  getAllCourses,
  getCourseById,
  getCourseOutline,
  createCourse,
  enrollCourse,
  rateCourse,
  updateCourseById,
  deleteCourseById
}
