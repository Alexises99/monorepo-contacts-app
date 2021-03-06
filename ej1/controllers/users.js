
const usersRouter = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('persons', {
    name: 1,
    number: 1,
    _id: 0
  })
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  try {
    const { body } = request
    const { username, name, password } = body

    const passwordHash = await bcrypt.hash(password, 10)

    const user = new User({
      username,
      name,
      passwordHash
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)
  } catch (error) {
    response.status(400).json(error)
  }
})

module.exports = usersRouter
