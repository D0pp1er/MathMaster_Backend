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

async function updateCourseContent (courseId, languageId, newName, newDescription) {
  try {
    const updatedCourseContent = await prisma.course_content.update({
      where: { course_id_language_id: { course_id: courseId, language_id: languageId } },
      data: {
        name: newName,
        description: newDescription
      }
    })

    return updatedCourseContent
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function editCourse (authorId, courseId, courseName, courseDescription, courseLanguage, coursetype, estimatedTime) {
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

  const languageID = await prisma.language.findUnique({
    where: {
      name: courseLanguage
    },
    select: {
      language_id: true
    }
  })
  if (languageID === null) {
    throw new Error('Language not found')
  }

  const typeId = await prisma.course_type.findUnique({
    where: {
      name: coursetype
    },
    select: {
      course_type_id: true
    }
  })
  if (typeId === null) {
    throw new Error('Course type not found')
  }

  const course = await prisma.course.update({
    where: {
      course_id: courseId
    },
    data: {
      type_id: typeId.course_type_id,
      estimated_time: estimatedTime
    }
  })
  if (course === null) {
    throw new Error('Course not found')
  }
  const updatedOutline = await updateCourseContent(courseId, languageID.language_id, courseName, courseDescription)
  return { course, updatedOutline }
}

async function searchAuthorByName (authorName) {
  // console.log('authorName in db\t', authorName)
  const authors = await prisma.user.findMany({
    where: {
      name: {
        contains: authorName,
        mode: 'insensitive'
      }
    }
  })
  return authors
}

module.exports = {
  CheckCourseAccess,
  editCourse,
  searchAuthorByName
}
