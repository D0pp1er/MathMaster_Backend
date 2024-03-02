const prisma = require('./prismaclient')

async function getTopicById (topicId, language) {
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
  const topic = await prisma.topic.findUnique({
    where: {
      topic_id: topicId
    },
    select: {
      topic_id: true,
      topic_content: {
        where: {
          language_id: languageId.language_id
        },
        select: {
          description: true,
          name: true,
          topic_id: true,
          language_id: true
        }
      }
    }
  })
  if (topic === null) {
    throw new Error('Topic not found')
  }
  return topic
}

async function editTopic (topicId, topicName, topicDescription, language) {
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
  const updatedTopic = await prisma.topic.update({
    where: {
      topic_id: topicId
    },
    data: {
      topic_content: {
        update: {
          where: {
            topic_id_language_id: {
              topic_id: topicId,
              language_id: languageId.language_id
            }
          },
          data: {
            name: topicName,
            description: topicDescription
          }
        }
      }
    },
    select: {
      topic_id: true,
      topic_content: {
        select: {
          name: true,
          description: true
        }
      }
    }
  })
  if (updatedTopic === null) {
    throw new Error('Error updating the topic')
  }
  return updatedTopic
}

module.exports = {
  getTopicById,
  editTopic
}
