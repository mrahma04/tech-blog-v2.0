const { User } = require('../models')

const users = [
    {
        username: 'mbrahman',
        email: 'mbrahman@gmail.com',
        password: 'password'
    }
]

// bulk create will try to use a SINGLE INSERT statement
// so hooks might not be available at the time of execution
// specifying individualHooks...it'll INSERT one row at a time
const seedUsers = () => User.bulkCreate(users, { individualHooks: true })

module.exports = seedUsers