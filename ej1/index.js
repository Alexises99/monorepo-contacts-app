require('dotenv').config()
require('./mongo')

const express = require('express')
const cors = require('cors')
const app = express()
const notFound = require('./middleware/notFound')
const handleErrors = require('./middleware/handleErros')
const usersRouter = require('./controllers/users')
const personsRouter = require('./controllers/person')
const loginRouter = require('./controllers/login')

app.use(cors())
app.use(express.json())

const persons = []

app.use(express.static('../contacts/build'))

app.get('/info', (request, response) => {
  const msg = 'Phonebook has info for ' + persons.length + 'people \n' +
                 new Date().toISOString()
  response.send(msg).end()
})

app.use('/api/login', loginRouter)
app.use('/api/persons', personsRouter)
app.use('/api/users', usersRouter)

app.use(notFound)

app.use(handleErrors)

const PORT = process.env.PORT

const server = app.listen(PORT, () => {
  console.log('Server running on port', PORT)
})

module.exports = { app, server }
