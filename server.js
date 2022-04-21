const express = require('express')
const routes = require('./controllers')
const sequelize = require('./config/connection')
const path = require('path')
const exphbs = require('express-handlebars')
const helpers = require('./utils/helpers')

const session = require('express-session')
// connect-session-sequelize package return a FUNCTION
// module.exports = function(argument) {}
// so this calls the function above with the passed argument 'session.Store'
const SequelizeStore = require('connect-session-sequelize')(session.Store)

const sess = {
    secret: process.env.SESSION_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({
        db: sequelize
    })
}

require('dotenv').config()

const PORT = process.env.PORT || 4001

const app = express()
const hbs = exphbs.create({ helpers })

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(session(sess))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

// use a middleware to intercept requests before
// being sent to 'routes' below
// res.locals will be sent to handlebars
app.use("*", (req, res, next) => {
    // res.locals.title = req.baseUrl
    if (req.baseUrl === '/dashboard') {
        res.locals.title = 'Your Dashboard'
    } else {
        res.locals.title = 'The Tech Blog'
    }
    next()
})

app.use(routes)

sequelize.sync({ force: false })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server now listening on ${PORT}`)
        })
    })