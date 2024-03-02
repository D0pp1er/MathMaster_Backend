const topicRepository = require('../database/topicrepository')

const getTopicById = async (req, res) => {
  try {
    const topicId = parseInt(req.params.topicId, 10) // Typecast to integer
    const language = req.user.preferredLanguage // Assuming language is provided in the request body
    const topic = await topicRepository.getTopicById(topicId, language)
    res.send(topic)
  } catch (error) {
    res.status(500).send('Error retrieving the topic' + error.message)
  }
}

const editTopic = async (req, res) => {
  try {
    if (req.user.role !== 'author') {
      throw new Error('You are not authorized to perform this action')
    }
    const topicId = parseInt(req.params.topicId, 10) // Typecast to integer
    const topicName = req.body.name
    const topicDescription = req.body.description
    const language = req.body.language
    const updatedTopicContent = await topicRepository.editTopic(topicId, topicName, topicDescription, language)
    res.send({ updatedTopic: updatedTopicContent, status: 'success', message: 'Topic updated successfully' })
  } catch (error) {
    res.status(500).send({ message: 'Error updating the topic\t' + error.message, status: 'failed' })
  }
}

module.exports = {
  getTopicById,
  editTopic
}
