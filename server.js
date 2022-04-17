const express = require('express')
const routes = require('./controllers')
const sequelize = require('./config/connection')
const path = require('path')
const exphbs = require('express-handlebars')

const session = require('express-session')
// connect-session-sequelize package return a FUNCTION
// module.exports = function(argument) {}
// so this calls the function above with the passed argument 'session.Store'
const SequelizeStore = require('connect-session-sequelize')(session.Store)

const sess = {
    secret: process.env.SESSION_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
}

require('dotenv').config()

const PORT = process.env.PORT || 4001

const app = express()
const hbs = exphbs.create({})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(session(sess))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(routes)

sequelize.sync({ force: false })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server now listening on ${PORT}`)
        })
    })