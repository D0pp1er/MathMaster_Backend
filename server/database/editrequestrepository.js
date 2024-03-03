const prisma = require('./prismaclient')

async function getUnpublishedEditRequestForAuthor (authorId) {
  const editRequests = await prisma.editRequest.findMany({
    where: {
      author_id: authorId,
      status: 'unpublished'
    }
  })
  return editRequests
}
