const prisma = require('./prismaclient')
// const filehander = require('../utils/filehander')

async function CheckCourseAccess (authorId, courseId) {
  const access = await prisma.authorized_course_authors.findUnique({
    where: {
      user_id_course_id: {
        user_id: authorId,
        course_id: courseId
      }
    }
  })
  if (access === null) {
    throw new Error('You are not the assigned author for this course')
  }
  return access
}

module.exports = {
  CheckCourseAccess
}
