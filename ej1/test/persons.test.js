
const { server } = require('../index')
const mongoose = require('mongoose')
const Person = require('../models/Person')
const { initialPersons, api, getAllNamesFromPersons, getAllPersons } = require('./helper')

beforeEach(async () => {
  await Person.deleteMany({})

  /* const initial = initialPersons.map(person => new Person(person))
  const promises = initial.map(person => person.save())
  await Promise.all(promises) */

  for (const person of initialPersons) {
    const personObject = new Person(person)
    await personObject.save()
  }
})

test('persons are returned as json', async () => {
  await api
    .get('/api/persons')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are 3 persons', async () => {
  const response = await getAllPersons()
  expect(response.body).toHaveLength(initialPersons.length)
})

test('first person name about Alexin', async () => {
  const response = await getAllPersons()
  expect(response.body[0].name).toBe('Alexin')
})

test('Alexin12 is included', async () => {
  const { names } = await getAllNamesFromPersons()
  expect(names).toContain('Alexin12')
})

test('Adding a new Person', async () => {
  const newPerson = {
    name: 'Laura',
    number: 1234567689
  }
  await api
    .post('/api/persons')
    .send(newPerson)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const { names, response } = await getAllNamesFromPersons()
  expect(response.body).toHaveLength(initialPersons.length + 1)
  expect(names).toContain(newPerson.name)
})

test('Add a empty person', async () => {
  const newPerson = {
    name: 'Alex'
  }
  await api
    .post('/api/persons')
    .send(newPerson)
    .expect(400)
  const response = await getAllPersons()
  expect(response.body).toHaveLength(initialPersons.length)
})

test('Delete a person', async () => {
  const { response: firstResponse } = await getAllNamesFromPersons()
  const { body: notes } = firstResponse
  const note = notes[0]

  await api
    .delete(`/api/persons/${note.id}`)
    .expect(204)

  const { response: secondResponse } = await getAllNamesFromPersons()
  const { body: notesAfterDelete } = secondResponse
  expect(notesAfterDelete).toHaveLength(notes.length - 1)
  expect(notesAfterDelete).not.toContain(note)
})

test('Cannot delete a person that not exists', async () => {
  await api
    .delete('/api/persons/13342')
    .expect(400)

  const { response } = await getAllNamesFromPersons()
  const { body: notes } = response
  expect(notes).toHaveLength(initialPersons.length)
})

afterAll(() => {
  server.close()
  mongoose.connection.close()
})
