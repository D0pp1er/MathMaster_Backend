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

module.exports = {
  getUserPreferredLanguage
}
