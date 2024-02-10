const definitionrepository = require('../database/definitionrepository')

const getDefinitionById = async (req, res) => {
  try {
    const definitionId = parseInt(req.params.definitionId, 10) // Typecast to integer
    const definition = await definitionrepository.getDefinitionById(definitionId)
    res.send(definition)
  } catch (error) {
    res.status(500).send('Error retrieving the definition' + error.message)
  }
}

const getAllDefinitions = async (req, res) => {
  try {
    const definitions = await definitionrepository.getAllDefinitions()
    res.send(definitions)
  } catch (error) {
    res.status(500).send('Error getting all definitions: ' + error.message)
  }
}

module.exports = {
  getDefinitionById,
  getAllDefinitions
}
