const definitionrepository = require('../database/definitionrepository')

const getDefinitionById = async (req, res) => {
  try {
    const definitionId = parseInt(req.params.definitionId, 10) // Typecast to integer
    let isUser = false
    if (req.user.role === 'user') {
      isUser = true
    }
    const definition = await definitionrepository.getDefinitionById(definitionId, isUser)
    res.send(definition)
  } catch (error) {
    res.status(500).send('Error retrieving the definition' + error.message)
  }
}

const getAllDefinitions = async (req, res) => {
  try {
    let isUser = false
    if (req.user.role === 'user') {
      isUser = true
    }
    const definitions = await definitionrepository.getAllDefinitions(isUser)
    res.send(definitions)
  } catch (error) {
    res.status(500).send('Error getting all definitions: ' + error.message)
  }
}

const editDefinition = async (req, res) => {
  try {
    if (req.user.role !== 'author') {
      throw new Error('You are not authorized to perform this action')
    }
    const definitionId = parseInt(req.params.definitionId, 10) // Typecast to integer
    const definitionName = req.body.name
    const definitionDescription = req.body.content
    const language = req.body.language
    const updatedDefinitionContent = await definitionrepository.editDefinition(definitionId, definitionName, definitionDescription, language)
    res.send({ updatedDefinition: updatedDefinitionContent, status: 'success', message: 'Definition updated successfully' })
  } catch (error) {
    res.status(500).send({ message: 'Error updating the definition\t' + error.message, status: 'failed' })
  }
}

module.exports = {
  getDefinitionById,
  getAllDefinitions,
  editDefinition
}
