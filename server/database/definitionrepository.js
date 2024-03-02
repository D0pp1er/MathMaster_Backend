const prisma = require('./prismaclient')
const filehander = require('../utils/filehander')

async function getDefinitionById (definitionId, isUser) {
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
  // if definition content filepath contains unpublished then return null
  if (definition.content.includes('unpublished') && isUser) {
    return null
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

async function getAllDefinitions (isUser) {
  const definitions = await prisma.definition.findMany({
    select: {
      definition_id: true
    }
  })
  const definitionContents = (await Promise.all(
    definitions.map(async (definition) => {
      return getDefinitionById(definition.definition_id, isUser)
    })
  )).filter(item => item !== null)

  return definitionContents
}

async function addDefinition (defname, defcontent, language) {
  const languageId = await prisma.language.findUnique({
    where: {
      name: language
    },
    select: {
      language_id: true
    }
  })
  if (languageId === null) {
    throw new Error('Language not found')
  }

  const definition = await prisma.definition.create({
    data: {
      name: defname,
      content: 'mock content',
      language_id: languageId.language_id
    }
  })
  // ../contents/published/language_English/definitions/definition_1.txt
  const defFilePath = '../contents/unpublished/language_' + language + '/definitions/definition_' + definition.definition_id + '.txt'
  filehander.writeFile(defFilePath, defcontent)

  const updatecontent = await prisma.definition.update({
    where: {
      definition_id: definition.definition_id
    },
    data: {
      content: defFilePath
    }
  })
  updatecontent.content = defcontent
  return updatecontent
}

module.exports = {
  getDefinitionById,
  getAllDefinitions,
  addDefinition
}
