const Sequelize = require('sequelize')
const fs = require('fs')

require('dotenv').config()

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'db.stippled.art',
    dialect: 'mysql',
    dialectOptions: {
        ssl: {
            cert: fs.readFileSync('./certs/client-cert.cer'),
            key: fs.readFileSync('./certs/client-key.cer'),
            ca: fs.readFileSync('./certs/server-ca.cer')
        }
    }
})

// const init = async () => {
//     try {
//         await sequelize.authenticate()
//         console.log('Connection has been established successfully.')
//     } catch (error) {
//         console.error('Unable to connect to the database', error)
//     }
// }

// init()

module.exports = sequelize