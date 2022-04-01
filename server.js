const express = require('express')
const routes = require('./controllers')

const app = express()

const PORT = process.env.PORT || 4001

app.use(routes)

app.listen(PORT, () => {
    console.log(`Server not listening on port ${PORT}`)
})