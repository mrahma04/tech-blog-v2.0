const express = require('express')
const routes = require('./controllers')
const sequelize = require('./config/connection')

const app = express()

const PORT = process.env.PORT || 4001

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routes)

sequelize.sync({ force: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server now listening on ${PORT}`)
        })
    })