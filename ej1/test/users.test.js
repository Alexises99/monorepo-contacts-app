const User = require('../models/User')
const bcrypt = require('bcrypt')
const { api } = require('./helper')
const { server } = require('../index')
const mongoose = require('mongoose')

describe('creating new user', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('password', 10)
    const user = new User({ username: 'Laurins', name: 'Miguel', passwordHash })
    await user.save()
  })

  test('users is created', async () => {
    const usersDB = await User.find({})
    const usersAtStart = usersDB.map(user => user.toJSON())

    const newUser = {
      username: 'midudev',
      name: 'Miguel',
      password: 'holis'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const users = await User.find({})
    const usersAtTheEnd = users.map(user => user.toJSON())

    expect(usersAtTheEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtTheEnd.map(user => user.username)
    expect(usernames).toContain(newUser.username)
  })

  test('username must be unique', async () => {
    const usersDB = await User.find({})
    const usersAtStart = usersDB.map(user => user.toJSON())

    const newUser = {
      username: 'Laurins',
      name: 'Miguel',
      password: 'holis'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.errors.username.message).toContain('`username` to be unique')
    const users = await User.find({})
    const usersAtEnd = users.map(user => user.toJSON())
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  afterAll(() => {
    server.close()
    mongoose.connection.close()
  })
})
