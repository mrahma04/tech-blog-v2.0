const express = require('express')
const routes = require('./controllers')
const sequelize = require('./config/connection')
const path = require('path')
const exphbs = require('express-handlebars')

const app = express()
const hbs = exphbs.create({})

const PORT = process.env.PORT || 4001

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(routes)

sequelize.sync({ force: false })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server now listening on ${PORT}`)
        })
    })