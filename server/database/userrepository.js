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

module.exports = {
  getUserPreferredLanguage,
  registerUser,
  loginUser
}
