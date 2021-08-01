
const personsRouter = require('express').Router()
const Person = require('../models/Person')
const User = require('../models/User')
const userExtractor = require('../middleware/userExtractor')

personsRouter.get('/', async (request, response) => {
  const persons = await Person.find({}).populate('user', {
    name: 1,
    username: 1
  })
  response.json(persons)
})

personsRouter.get('/:id', async (request, response, next) => {
  const id = request.params.id
  try {
    const person = await Person.findById(id)
    if (person) response.json(person)
  } catch (err) {
    next(err)
  }

  response.status(404).end()
})

personsRouter.delete('/:id', userExtractor, async (request, response, next) => {
  const id = request.params.id
  try {
    const person = await Person.findByIdAndRemove(id)
    response.status(204).json(person)
  } catch (err) {
    next(err)
  }
})

personsRouter.post('/', userExtractor, async (request, response, next) => {
  const { name, number } = request.body
  const userId = request.userId
  const user = await User.findById(userId)

  const newPerson = new Person({
    name,
    number,
    user: user._id
  })

  try {
    const savedPerson = await newPerson.save()
    user.persons = user.persons.concat(savedPerson._id)
    await user.save()
    response.status(201).json(savedPerson)
  } catch (err) {
    next(err)
  }
})

personsRouter.put('/:id', userExtractor, async (request, response, next) => {
  const { id } = request.params
  const person = request.body

  const newNoteInfo = {
    name: person.name,
    number: person.number
  }
  try {
    const person = await Person.findByIdAndUpdate(id, newNoteInfo, { new: true })
    response.status(200).json(person)
  } catch (err) {
    next(err)
  }
})

module.exports = personsRouter
