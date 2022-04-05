const sequelize = require('../config/connection')
const seedUsers = require('./user-seeds')
const seedPosts = require('./post-seeds')
const seedComments = require('./comment-seeds.js')

const seedAll = async () => {
    await sequelize.sync({ force: true })
    await seedUsers()
    console.log('Users seeded')
    await seedPosts()
    console.log('Posts seeded')
    await seedComments()
    console.log('Comments seeded')
    sequelize.close()
}

seedAll()