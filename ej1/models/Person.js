const mongoose = require('mongoose')
const { model, Schema } = mongoose

const personSchema = new Schema({
  name: String,
  number: Number,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Person = model('Person', personSchema)

module.exports = Person
