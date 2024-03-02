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

module.exports = {
  getDefinitionById,
  getAllDefinitions
}
