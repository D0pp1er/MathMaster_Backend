const authorrepository = require('../database/authorrepository')
const definitionrepository = require('../database/definitionrepository')
const courseRepository = require('../database/courserepository')
const lessonrepository = require('../database/lessonrepository')
const quizrepository = require('../database/quizrepository')
const editrequestrepository = require('../database/editrequestrepository')

const getLessonById = async (req, res) => {
  try {
    // const lessonId = parseInt(req.params.lessonId, 10) // Typecast to integer
    // const lesson = await lessonrepository.getLessonById(3, lessonId, 'Novice')
    // res.send(lesson)
    if (req.user.role !== 'author') {
      throw new Error('You are not authorized to perform this action')
    }
    // const lessonId = parseInt(req.params.lessonId, 10) // Typecast to integer
    console.log('req.query', req.query)
    let language = res.query.lang
    let abstractionLevel = res.query.abs
    const courseId = parseInt(res.query.courseId, 10)
    if (language === undefined) {
      language = 'English'
    }
    if (abstractionLevel === undefined) {
      abstractionLevel = 'Novice'
    }
    if (courseId === undefined) {
      throw new Error('CourseId is required')
    }
    await authorrepository.CheckCourseAccess(req.user.userId, courseId)
    res.send('Hello from getLessonById')
  } catch (error) {
    res.status(500).send('Error retrieving the lesson' + error.message)
  }
}

const editCourse = async (req, res) => {
  try {
    if (req.user.role !== 'author') {
      throw new Error('\tYou are not authorized to perform this action')
    }
    const courseId = parseInt(req.params.courseId, 10) // Typecast to integer
    const courseName = req.body.name
    const courseDescription = req.body.description
    const courseLanguage = req.body.language
    const coursetype = req.body.type
    const estimatedTime = parseInt(req.body.estimatedTime, 10)
    const authorId = req.user.userId
    const updatedCourseContent = await authorrepository.editCourse(authorId, courseId, courseName, courseDescription, courseLanguage, coursetype, estimatedTime)
    res.send({ updatedCourse: updatedCourseContent, status: 'success', message: 'Course updated successfully' })
  } catch (error) {
    res.status(500).send({ message: 'Error updating the course\t' + error.message, status: 'failed' })
  }
}

const addDefinition = async (req, res) => {
  try {
    if (req.user.role !== 'author') {
      throw new Error('You are not authorized to perform this action')
    }
    const defname = req.body.name
    const defcontent = req.body.content
    const language = req.body.language
    const newDefinition = await definitionrepository.addDefinition(defname, defcontent, language)
    const editRequest = await editrequestrepository.addEditRequest(req.user.userId, newDefinition.definition_id, 'definition', 'added new definition')
    res.send({ newDefinition, status: 'success', message: 'Definition added successfully', editRequest })
  } catch (error) {
    res.status(500).send({ message: 'Error adding the definition' + error.message, status: 'failed' })
  }
}

const addTopicOfCourse = async (req, res) => {
  try {
    if (req.user.role !== 'author') {
      throw new Error('You are not authorized to perform this action')
    }
    const courseId = parseInt(req.params.courseId, 10) // Typecast to integer
    const topicName = req.body.name
    const topicDescription = req.body.description
    const topicLanguage = req.body.language
    const authorId = req.user.userId
    const newTopic = await courseRepository.addTopicOfCourse(courseId, topicName, topicDescription, topicLanguage, authorId)
    res.send({ newTopic, status: 'success', message: 'Topic added successfully' })
  } catch (error) {
    res.status(500).send({ message: 'Error adding the topic\t' + error.message, status: 'failed' })
  }
}

const addLessonToTopic = async (req, res) => {
  try {
    if (req.user.role !== 'author') {
      throw new Error('You are not authorized to perform this action')
    }
    const topicId = parseInt(req.params.topicId, 10) // Typecast to integer
    const authorId = req.user.userId
    const lessonXp = parseInt(req.body.xp, 10)
    const lessonName = req.body.name
    const lessonContent = req.body.content
    const language = req.body.language
    const abstractionLevel = req.body.abstraction_level

    const newLesson = await lessonrepository.addLesson(topicId, lessonXp, lessonName, lessonContent, language, abstractionLevel, authorId)
    const editRequest = await editrequestrepository.addEditRequest(req.user.userId, newLesson.lesson.lesson_id, 'lesson', 'added new lesson')
    res.send({ newLesson, status: 'success', message: 'Lesson added to topic successfully', editRequest })
  } catch (error) {
    res.status(500).send({ message: 'Error adding the lesson to topic\t' + error.message, status: 'failed' })
  }
}

const addQuizToTopic = async (req, res) => {
  try {
    if (req.user.role !== 'author') {
      throw new Error('You are not authorized to perform this action')
    }
    const topicId = parseInt(req.params.topicId, 10) // Typecast to integer
    const xp = parseInt(req.body.xp, 10)
    const totalScore = parseInt(req.body.totalScore, 10)
    const name = req.body.name
    const content = req.body.content
    const language = req.body.language
    const newQuiz = await quizrepository.addQuiz(topicId, xp, totalScore, name, content, language)
    const editRequest = await editrequestrepository.addEditRequest(req.user.userId, newQuiz.quiz_id, 'quiz', 'added new quiz')
    // const unpublished = await editrequestrepository.getUnpublishedEditRequestForAuthor(req.user.userId)
    res.send({ newQuiz, status: 'success', message: 'Quiz added to topic successfully', editRequest })
  } catch (error) {
    res.status(500).send({ message: 'Error adding the quiz to topic\t' + error.message, status: 'failed' })
  }
}

const getUnpublishedEditRequestForAuthor = async (req, res) => {
  try {
    if (req.user.role !== 'author') {
      throw new Error('You are not authorized to perform this action')
    }
    const unpublished = await editrequestrepository.getUnpublishedEditRequestForAuthor(req.user.userId)
    res.send(unpublished)
  } catch (error) {
    res.status(500).send({ message: 'Error getting the unpublished edit requests\t' + error.message, status: 'failed' })
  }
}

module.exports = {
  getLessonById,
  editCourse,
  addDefinition,
  addTopicOfCourse,
  addLessonToTopic,
  addQuizToTopic,
  getUnpublishedEditRequestForAuthor
}
