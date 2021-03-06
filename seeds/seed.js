const sequelize = require('../config/connection')
const { User, Post, Comment } = require('../models')

const userSeedData = require('./userSeedData.json')
const postSeedData = require('./postSeedData.json')
const commentSeedData = require('./commentSeedData.json')

const seedDatabase = async () => {
    console.log('Opening connection to DB...')
    await sequelize.sync({ force: true })
    await User.bulkCreate(userSeedData, { individualHooks: true })
    console.log('Users seeded')
    await Post.bulkCreate(postSeedData, { individualHooks: true })
    console.log('Posts seeded')
    await Comment.bulkCreate(commentSeedData, { individualHooks: true })
    console.log('Comments seeded')
    console.log('Closing connection to DB...')
    sequelize.close()
}

seedDatabase()