const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function addUser () {
  await prisma.user.createMany({
    data: [{
      email: 'sharifulislam.9876@gmail.com',
      password: '123456',
      name: 'Shariful Islam',
      DOB: new Date('1998-12-12').toISOString(),
      picture: 'https://i.ibb.co/0jZQY7F/IMG-20201212-123456.jpg'
    },
    {
      email: 'asibrahmanbarbie.233@gmail.com',
      password: '123456',
      name: 'Asib Rahman',
      DOB: new Date('1998-12-12').toISOString(),
      picture: 'https://i.ibb.co/0jZQY7F/IMG-20201212-123456.jpg'
    },
    {
      email: 'johndoe@anym.com',
      password: '123456',
      name: 'John Doe',
      DOB: new Date('1998-12-12').toISOString(),
      picture: 'https://i.ibb.co/0jZQY7F/IMG-20201212-123456.jpg'
    }]
  })
}

// add_user()
//     .catch(e => {
//         throw e
//     })
//     .finally(async () => {
//         await prisma.$disconnect()
//     })

async function addAuthor () {
  await prisma.author.createMany({
    data: [{
      user_id: 1
    },
    {
      user_id: 2
    }]
  })
}

// add_author()
//     .catch(e => {
//         throw e
//     })
//     .finally(async () => {
//         await prisma.$disconnect()
//     })

async function addCourseType () {
  await prisma.course_type.createMany({
    data: [{
      name: 'Algebra'
    },
    {
      name: 'Arithmetic'
    }]
  })
}

// add_course_type()
//     .catch(e => {
//         throw e
//     })
//     .finally(async () => {
//         await prisma.$disconnect()
//     })

async function addCourseLevel () {
  await prisma.course_level.createMany({
    data: [{
      name: 'Beginner'
    },
    {
      name: 'Intermediate'
    },
    {
      name: 'Hard'
    }]
  })
}

async function addCourse () {
  await prisma.course.createMany({
    data: [{
      level_id: 1,
      type_id: 1,
      picture: 'https://i.ibb.co/0jZQY7F/IMG-20201212-123456.jpg',
      estimated_time: 10
    },
    {
      level_id: 2,
      type_id: 1,
      picture: 'https://i.ibb.co/0jZQY7F/IMG-20201212-123456.jpg',
      estimated_time: 24
    },
    {
      level_id: 1,
      type_id: 2,
      picture: 'https://i.ibb.co/0jZQY7F/IMG-20201212-123456.jpg',
      estimated_time: 20
    }]
  })
}

// add_course()
//     .catch(e => {
//         throw e
//     })
//     .finally(async () => {
//         await prisma.$disconnect()
//     })

async function addLanguage () {
  await prisma.language.createMany({
    data: [{
      name: 'English'
    },
    {
      name: 'Bangla'
    }]
  })
}

// add_language()
//     .catch(e => {
//         throw e
//     })
//     .finally(async () => {
//         await prisma.$disconnect()
//     })

async function addCourseContent () {
  await prisma.course_content.createMany({
    data: [
      {
        name: 'Algebra I',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        course_id: 1,
        language_id: 1
      },
      {
        name: 'Algebra II',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        course_id: 2,
        language_id: 1
      },
      {
        name: 'Fractions',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        course_id: 3,
        language_id: 1
      }]
  })
}

// add_course_content()
//     .catch(e => {
//         throw e
//     })
//     .finally(async () => {
//         await prisma.$disconnect()
//     })

async function addPrerequisite () {
  await prisma.prerequisite_course.createMany({
    data: [{
      course_id: 2,
      prerequisite_id: 1
    }]
  })
}

// add_prerequisite()
//     .catch(e => {
//         throw e
//     })
//     .finally(async () => {
//         await prisma.$disconnect()
//     })

async function addTopic () {
  await prisma.topic.createMany({
    data: [
      {
        course_id: 1

      },
      {
        course_id: 1

      }

    ]
  })
}

// add_topic()
//     .catch(e => {
//         throw e
//     })
//     .finally(async () => {
//         await prisma.$disconnect()
//     })

async function addTopicContent () {
  await prisma.topic_content.createMany({
    data: [
      {
        name: 'Topic 1',
        topic_id: 1,
        language_id: 1
      },
      {
        name: 'Topic 2',
        topic_id: 2,
        language_id: 1
      }

    ]
  })
}

// add_topic_content()
//     .catch(e => {
//         throw e
//     })
//     .finally(async () => {
//         await prisma.$disconnect()
//     })

async function addAbstracitonLevel () {
  await prisma.abstraction_level.createMany({
    data: [
      {
        name: 'Novice'
      },
      {
        name: 'Intermediate'
      },
      {
        name: 'Expert'
      }

    ]
  })
}

// add_abstraciton_level()
//     .catch(e => {
//         throw e
//     })
//     .finally(async () => {
//         await prisma.$disconnect()
//     })

async function addLesson () {
  await prisma.lesson.createMany({
    data: [
      {
        topic_id: 1,
        XP: 100
      },
      {
        topic_id: 1,
        XP: 80
      },
      {
        topic_id: 1,
        XP: 100
      },
      {
        topic_id: 2,
        XP: 50
      },
      {
        topic_id: 2,
        XP: 80
      },
      {
        topic_id: 2,
        XP: 50
      }

    ]
  })
}

// add_lesson()
//     .catch(e => {
//         throw e
//     })
//     .finally(async () => {
//         await prisma.$disconnect()
//     })

async function addLessonContent () {
  await prisma.lesson_content.createMany({
    data: [
      {
        lesson_id: 1,
        name: 'Lesson 1',
        language_id: 1,
        abstraction_level_id: 1,
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      }

    ]
  })
}

// add_lesson_content()
//     .catch(e => {
//         throw e
//     })
//     .finally(async () => {
//         await prisma.$disconnect()
//     })

async function addDefinition () {
  await prisma.definition.createMany({
    data: [
      {
        name: 'linear',
        content: 'In mathematics, a linear function is a polynomial function of degree one. It has the form y = mx + b, where m is the slope and b is the y-intercept.',
        language_id: 1
      },
      {
        name: 'slope',
        content: 'In mathematics, slope refers to the steepness or incline of a line. It represents the ratio of the vertical change (rise) to the horizontal change (run) between two points on the line.',
        language_id: 1
      }

    ]
  })
}

// add_definition()
//     .catch(e => {
//         throw e
//     })
//     .finally(async () => {
//         await prisma.$disconnect()
//     })

async function addQuiz () {
  await prisma.quiz.createMany({
    data: [
      {
        topic_id: 1,
        XP: 100,
        Total_score: 100
      }

    ]
  })
}

// add_quiz()
//     .catch(e => {
//         throw e
//     })
//     .finally(async () => {
//         await prisma.$disconnect()
//     })

async function addQuizContent () {
  await prisma.quiz_content.createMany({
    data: [
      {
        quiz_id: 1,
        content: 'Quiz is a form of game or mind sport, attempt to answer questions correctly.',
        language_id: 1
      }

    ]
  })
}

// add_quiz_content()
//     .catch(e => {
//         throw e
//     })
//     .finally(async () => {
//         await prisma.$disconnect()
//     })

async function addLessonAuthor () {
  await prisma.lesson_author.createMany({
    data: [
      {
        author_id: 1,
        lesson_id: 1,
        language_id: 1,
        abstraction_level_id: 1
      },
      {
        author_id: 2,
        lesson_id: 1,
        language_id: 1,
        abstraction_level_id: 1
      }

    ]
  })
}

async function addEnrolledCourse () {
  await prisma.enrolled_courses.createMany({
    data: [
      {
        user_id: 3,
        course_id: 1,
        timestamp: new Date('2020-12-12T08:30:21').toISOString()
      },
      {
        user_id: 3,
        course_id: 2,
        timestamp: new Date('2023-12-12T08:30:21').toISOString()
      }

    ]
  })
}

async function addCompletedLesson () {
  await prisma.completed_lessons.createMany({
    data: [
      {
        user_id: 3,
        lesson_id: 1,
        timestamp: new Date('2022-11-21T08:30:21').toISOString(),
        rating: 4,
        feedback: 'Interesting'

      }
    ]
  })
}

async function addCompletedQuiz () {
  await prisma.completed_quizzes.createMany({
    data: [
      {
        user_id: 3,
        quiz_id: 1,
        timestamp: new Date('2022-11-21T08:30:21').toISOString(),
        score: 90,
        XP: 90
      }
    ]
  })
}
async function seedData () {
  try {
    await addUser()
    await addAuthor()
    await addCourseType()
    await addCourseLevel()
    await addCourse()
    await addLanguage()
    await addCourseContent()
    await addPrerequisite()
    await addTopic()
    await addTopicContent()
    await addAbstracitonLevel()
    await addLesson()
    await addLessonContent()
    await addDefinition()
    await addQuiz()
    await addQuizContent()
    await addLessonAuthor()
    await addEnrolledCourse()
    await addCompletedLesson()
    await addCompletedQuiz()
  } catch (error) {
    console.error(error)
  }
}

seedData()
