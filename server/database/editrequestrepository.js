const prisma = require('./prismaclient')
const filehander = require('../utils/filehander')
async function getTopicIDTopicNameCourseIDCourseNameLessonContentOfLessonById (lessonId) {
  const lesson = await prisma.lesson.findUnique({
    where: {
      lesson_id: lessonId
    },
    select: {
      lesson_id: true,
      XP: true,
      topic:
        {
          select: {
            topic_id: true,
            topic_content:
                {
                  select:
                    {
                      name: true,
                      description: true
                    }
                },
            course:
                {
                  select:
                    {
                      course_id: true,
                      course_content:
                        {
                          select:
                            {
                              name: true,
                              description: true
                            }
                        }
                    }
                }
          }
        },
      lesson_content:
        {
          select:
            {
              name: true,
              content: true,
              language_id: true,
              abstraction_level_id: true,
              language:
                {
                  select:
                    {
                      name: true
                    }
                },
              abstraction_level:
                {
                  select:
                    {
                      name: true
                    }
                }
            }
        }
    }
  })

  if (lesson === null) {
    throw new Error('Lesson not found')
  }

  const filepath = lesson.lesson_content[0].content
  const content = filehander.readFileData(filepath)
  lesson.lesson_content[0].content = content

  return {
    lessonId: lesson.lesson_id,
    XP: lesson.XP,
    topicId: lesson.topic.topic_id,
    topicName: lesson.topic.topic_content[0].name,
    topicDescription: lesson.topic.topic_content[0].description,
    courseId: lesson.topic.course.course_id,
    courseName: lesson.topic.course.course_content[0].name,
    courseDescription: lesson.topic.course.course_content[0].description,
    lessonName: lesson.lesson_content[0].name,
    lessonContent: lesson.lesson_content[0].content,
    language: lesson.lesson_content[0].language.name,
    abstractionLevel: lesson.lesson_content[0].abstraction_level.name,
    filePath: filepath,
    languageId: lesson.lesson_content[0].language_id,
    abstractionLevelId: lesson.lesson_content[0].abstraction_level_id
  }
}

async function getTopicIDTopicNameCourseIDCourseNameQuizContentByQuizID (quizId) {
  const quiz = await prisma.quiz.findUnique({
    where: {
      quiz_id: quizId
    },
    select: {
      quiz_id: true,
      XP: true,
      Total_score: true,
      topic:
        {
          select:
            {
              topic_id: true,
              topic_content:
                {
                  select:
                    {
                      name: true,
                      description: true
                    }
                },
              course:
                {
                  select:
                    {
                      course_id: true,
                      course_content:
                        {
                          select:
                            {
                              name: true,
                              description: true
                            }
                        }
                    }
                }
            }
        },
      quiz_content:
        {
          select:
            {
              name: true,
              content: true,
              language_id: true,
              language:
                {
                  select:
                    {
                      name: true
                    }
                }
            }
        }
    }
  })

  if (quiz === null) {
    throw new Error('Quiz not found')
  }
  //   console.log(quiz)
  const filepath = quiz.quiz_content[0].content
  const content = filehander.readFileData(filepath)
  quiz.quiz_content[0].content = content
  return {
    quizId: quiz.quiz_id,
    XP: quiz.XP,
    topicId: quiz.topic.topic_id,
    topicName: quiz.topic.topic_content[0].name,
    topicDescription: quiz.topic.topic_content[0].description,
    courseId: quiz.topic.course.course_id,
    courseName: quiz.topic.course.course_content[0].name,
    courseDescription: quiz.topic.course.course_content[0].description,
    quizName: quiz.quiz_content[0].name,
    quizContent: quiz.quiz_content[0].content,
    language: quiz.quiz_content[0].language.name,
    filePath: filepath,
    languageId: quiz.quiz_content[0].language_id
  }
}

async function getDefinitionById (definitionId) {
  const definition = await prisma.definition.findUnique({
    where: {
      definition_id: definitionId
    },
    select: {
      definition_id: true,
      name: true,
      content: true,
      language: {
        select: {
          name: true
        }
      }
    }
  })

  if (definition === null) {
    throw new Error('Definition not found')
  }

  const filepath = definition.content
  const content = filehander.readFileData(filepath)
  definition.content = content
  return {
    id: definition.definition_id,
    name: definition.name,
    content: definition.content,
    language: definition.language.name,
    filePath: filepath
  }
}

async function getContentById (contentId, contenttype) {
  if (contenttype.toLowerCase() === 'lesson'.toLowerCase()) {
    return getTopicIDTopicNameCourseIDCourseNameLessonContentOfLessonById(contentId)
  } else if (contenttype.toLowerCase() === 'quiz'.toLowerCase()) {
    return getTopicIDTopicNameCourseIDCourseNameQuizContentByQuizID(contentId)
  } else if (contenttype.toLowerCase() === 'definition'.toLowerCase()) {
    return getDefinitionById(contentId)
  } else {
    throw new Error('Content type not found')
  }
}

async function getUnpublishedEditRequestForAuthor (authorId) {
  const editRequests = await prisma.edit_request.findMany({
    where: {
      author_id: authorId,
      published: false
    }
  })

  const contentPromises = editRequests.map(async (request) => {
    // console.log(request)
    const content = await getContentById(request.requested_item_id, request.request_type)
    return { ...request, content }
  })

  const editRequestsWithContent = await Promise.all(contentPromises)

  return editRequestsWithContent
}

async function addEditRequest (authorId, requestedItemId, requestType, authorComment) {
  const editRequest = await prisma.edit_request.create({
    data: {
      author_id: authorId,
      requested_item_id: requestedItemId,
      request_type: requestType,
      author_feedback: authorComment
    }
  })
  return editRequest
}
async function getUnpublishedEditRequests () {
  const editRequests = await prisma.edit_request.findMany({
    where: {
      published: false
    }
  })

  const contentPromises = editRequests.map(async (request) => {
    // console.log(request)
    const content = await getContentById(request.requested_item_id, request.request_type)
    return { ...request, content }
  })

  const editRequestsWithContent = await Promise.all(contentPromises)

  return editRequestsWithContent
}

async function getPublishedEditRequests () {
  const editRequests = await prisma.edit_request.findMany({
    where: {
      published: true
    }
  })

  const contentPromises = editRequests.map(async (request) => {
    // console.log(request)
    const content = await getContentById(request.requested_item_id, request.request_type)
    return { ...request, content }
  })

  const editRequestsWithContent = await Promise.all(contentPromises)

  return editRequestsWithContent
}

async function getEditRequestById (editreqId) {
  const editRequests = await prisma.edit_request.findMany({
    where: {
      edit_request_id: editreqId
    }
  })

  const contentPromises = editRequests.map(async (request) => {
    // console.log(request)
    const content = await getContentById(request.requested_item_id, request.request_type)
    return { ...request, content }
  })

  const editRequestsWithContent = await Promise.all(contentPromises)

  return editRequestsWithContent
}

async function publishLesson (lessonId, filepath, content, languageId, abstractionLevelId) {
  const updatedfilepath = filepath.replace('unpublished', 'published')
  filehander.writeFile(updatedfilepath, content)
  const lesson = await prisma.lesson.update({
    where: {
      lesson_id: lessonId
    },
    data: {
      lesson_content: {
        update: {
          where: {
            lesson_id_language_id_abstraction_level_id: {
              lesson_id: lessonId,
              language_id: languageId,
              abstraction_level_id: abstractionLevelId
            }
          },
          data: {
            content: updatedfilepath
          }
        }
      }
    }
  })
  filehander.deleteFile(filepath)
  return lesson
}

async function publishQuiz (quizId, filepath, content, languageId) {
  const updatedfilepath = filepath.replace('unpublished', 'published')
  filehander.writeFile(updatedfilepath, content)
  const quiz = await prisma.quiz.update({
    where: {
      quiz_id: quizId
    },
    data: {
      quiz_content: {
        update: {
          where: {
            quiz_id_language_id: {
              quiz_id: quizId,
              language_id: languageId
            }
          },
          data: {
            content: updatedfilepath
          }
        }
      }
    }
  })
  filehander.deleteFile(filepath)
  return quiz
}

async function publishDefinition (definitionId, filepath, content, languageId) {
  const updatedfilepath = filepath.replace('unpublished', 'published')
  filehander.writeFile(updatedfilepath, content)
  const definition = await prisma.definition.update({
    where: {
      definition_id: definitionId
    },
    data: {
      content: updatedfilepath
    }
  })
  filehander.deleteFile(filepath)
  return definition
}

async function publishContent (editRequestId) {
  const editRequest = await prisma.edit_request.update({
    where: {
      edit_request_id: editRequestId
    },
    data: {
      published: true
    }
  })
  const content = await getContentById(editRequest.requested_item_id, editRequest.request_type)
  if (editRequest.request_type === 'lesson') {
    publishLesson(editRequest.requested_item_id, content.filePath, content.lessonContent, content.languageId, content.abstractionLevelId)
  } else if (editRequest.request_type === 'quiz') {
    publishQuiz(editRequest.requested_item_id, content.filePath, content.quizContent, content.languageId)
  } else if (editRequest.request_type === 'definition') {
    publishDefinition(editRequest.requested_item_id, content.filePath, content.content, content.languageId)
  }
  return { editRequest, content }
}

module.exports = {
  getUnpublishedEditRequestForAuthor,
  addEditRequest,
  getPublishedEditRequests,
  getUnpublishedEditRequests,
  getEditRequestById,
  publishContent
}
