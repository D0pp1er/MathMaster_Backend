const userrepository = require('../database/userrepository')

const getUserStats = async (req, res) => {
  try {
    const requsetUserID = parseInt(req.params.userId, 10)
    const userId = req.user.userId
    if (req.user.role !== 'admin' && requsetUserID !== userId) {
      res.status(403).send({ message: 'You are not allowed to view this user stats', status: 'failed' })
      return
    }

    const userStats = await userrepository.getUserStats(requsetUserID)
    res.send(userStats)
  } catch (error) {
    res.status(500).send('Error retrieving user stats\t' + error.message)
  }
}

module.exports = {
  getUserStats
}
