import { useState, useRef } from 'react'
import Toggable from './Toggable'

export const PersonsForm = ({ addPerson }) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const toggableRef = useRef()

  const handleChange = (event) => {
    setNewName(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    addPerson(newPerson)
    setNewName('')
    setNewNumber('')
    toggableRef.current.toggleVisibility()
  }

  return (
    <Toggable buttonlabel='Add Contact' ref={toggableRef}>
      <h3>add a new Contact</h3>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input onChange={handleChange} value={newName} />
        </div>
        <div>
          number: <input onChange={event => setNewNumber(event.target.value)} value={newNumber} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
    </Toggable>
  )
}
