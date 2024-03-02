const prisma = require('./prismaclient')

async function getUserPreferredLanguage (userId) {
  const user = await prisma.user.findUnique({
    where: {
      user_id: userId
    },
    select: {
      user_preferred_language:
        {
          select: {
            name: true
          }
        }
    }
  })
  if (user === null) {
    throw new Error('User not found')
  }
  return user.preferred_language
}

async function registerUser (useremail, userpassword, username, userDOB) {
  const user = await prisma.user.create({
    data: {
      email: useremail,
      password: userpassword,
      name: username
    }
  })
  if (user === null) {
    throw new Error('User not found')
  }
  return user
}

async function loginUser (useremail, userpassword) {
  const user = await prisma.user.findUnique({
    where: {
      email: useremail
    }
  })
  if (user === null) {
    throw new Error('Invalid credentials')
  }
  const userinfo = await prisma.user.findUnique({
    where: {
      password: userpassword,
      email: useremail
    },
    select: {
      user_id: true,
      email: true,
      name: true,
      picture: true,
      DOB: true,
      preferred_language_id: true,
      role:
        {
          select: {
            name: true
          }
        },
      user_preferred_language:
        {
          select: {
            name: true
          }
        }
    }
  })
  if (userinfo === null) {
    throw new Error('Wrong password')
  }
  return userinfo
}

// async function getTotalXPfromLessons (userId) {
//   const user = await prisma.user.findUnique({
//     where: { user_id: userId },
//     include: {
//       completed_lessons: true
//     }
//   })
//   if (user === null) {
//     throw new Error('User not found')
//   }
//   console.log(user.completed_lessons)
//   const totalXP = user.completed_lessons.reduce((total, lesson) => total + lesson.xp, 0)
//   return totalXP
// }

async function getUserXPInLast7Days (userId) {
  try {
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const user = await prisma.user.findUnique({
      where: { user_id: userId },
      include: {
        completed_lessons: {
          where: { timestamp: { gte: sevenDaysAgo } },
          include: { lesson: true }
        },
        completed_quizzes: {
          where: { timestamp: { gte: sevenDaysAgo } }
        }
      }
    })

    if (!user) {
      throw new Error('User not found')
    }

    const lessonXP = user.completed_lessons.map(lesson => ({ date: lesson.timestamp.toISOString().split('T')[0], xp: lesson.lesson.XP }))
    const quizXP = user.completed_quizzes.map(quiz => ({ date: quiz.timestamp.toISOString().split('T')[0], xp: quiz.XP }))

    const xpList = [...lessonXP, ...quizXP]

    const xpByDate = xpList.reduce((acc, curr) => {
      acc[curr.date] = (acc[curr.date] || 0) + curr.xp
      return acc
    }, {})

    const last7Dates = Array.from({ length: 7 }, (_, i) => {
      const d = new Date()
      d.setDate(d.getDate() - i)
      return d.toISOString().split('T')[0]
    })

    const xpLast7Days = last7Dates.reduce((acc, curr) => {
      acc[curr] = xpByDate[curr] || 0
      return acc
    }, {})

    return xpLast7Days
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function getUserStats (userId) {
  try {
    const user = await prisma.user.findUnique({
      where: { user_id: userId },
      include: {
        enrolled_courses: true,
        completed_lessons: {
          include: {
            lesson: true
          }
        },
        completed_quizzes: true
      }
    })

    if (!user) {
      throw new Error('User not found')
    }
    // console.log(user)
    const totalXp = user.completed_lessons.reduce((total, lesson) => total + lesson.lesson.XP, 0) + user.completed_quizzes.reduce((total, quiz) => total + quiz.XP, 0)
    const enrolled = user.enrolled_courses.length
    const lessonCompleted = user.completed_lessons.length
    const problemSolved = user.completed_quizzes.length
    const dailyXp = await getUserXPInLast7Days(userId)

    return {
      totalXp,
      dailyXp,
      enrolled,
      lessonCompleted,
      problemSolved
    }
    // return user
  } catch (error) {
    console.error(error)
    throw error
  }
}

// console.log(getUserStats(3))

module.exports = {
  getUserPreferredLanguage,
  registerUser,
  loginUser,
  getUserStats
}
