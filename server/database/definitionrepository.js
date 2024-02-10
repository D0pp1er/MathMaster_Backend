const prisma = require('./prismaclient')
const filehander = require('../utils/filehander')

async function getDefinitionById (definitionId) {
  const definition = await prisma.definition.findUnique({
    where: {
      definition_id: definitionId
    },
    select: {
      definition_id: true,
      name: true,
      content: true
    }
  })
  let definitioncontent = ''

  if (definition === null) {
    throw new Error('Definition not found')
  }
  definitioncontent = filehander.readFileData(definition.content)
  if (definitioncontent === null) {
    throw new Error('Definition content not found at the given path')
  }

  const definitionContent = {
    id: definition.definition_id,
    name: definition.name,
    content: definitioncontent
  }
  return definitionContent
}

async function getAllDefinitions () {
  const definitions = await prisma.definition.findMany({
    select: {
      definition_id: true
    }
  })
  const definitionContents = await Promise.all(
    definitions.map(async (definition) => {
      return getDefinitionById(definition.definition_id)
    })
  )

  return definitionContents
}

module.exports = {
  getDefinitionById,
  getAllDefinitions
}
