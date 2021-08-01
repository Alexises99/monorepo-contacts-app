const supertest = require('supertest')
const { app } = require('../index')
const api = supertest(app)

const initialPersons = [
  {
    name: 'Alexin',
    number: 12345
  },
  {
    name: 'Alexin12',
    number: 1233145
  },
  {
    name: 'Alexin112',
    number: 1233145
  }
]

const getAllNamesFromPersons = async () => {
  const response = await api.get('/api/persons')
  return {
    names: response.body.map(person => person.name),
    response
  }
}

const getAllPersons = async () => {
  const response = await api.get('/api/persons')
  return response
}

const getAllUsers = async () => {
  const response = await api.get('/api/users')
  return response
}

module.exports = { initialPersons, api, getAllNamesFromPersons, getAllPersons, getAllUsers }
