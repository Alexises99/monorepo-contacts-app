import React, { useState, useEffect } from 'react'
import { Filter } from './Filter'
import { PersonsForm } from './PersonsForm'
import { Persons } from './Persons'
import '../App.css'
import personService from '../services/persons'
import { Error } from './Error'
import { LoginForm } from './LoginForm'

export const App = () => {
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedContactAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      personService.setToken(user.token)
    }
  }, [])

  const [persons, setPersons] = useState([])
  const [search, setNewSearch] = useState('')
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)

  const addPerson = (personObject) => {
    personService
      .createNote(personObject)
      .then(person => {
        const newPersons = [...persons, person]
        setPersons(newPersons)
      })
  }

  const div = () => {
    return (
      <div>
        <button onClick={handleLogout}>
          Logout
        </button>
        <Filter
          setNewSearch={setNewSearch}
          search={search}
        />
        <PersonsForm
          persons={persons}
          addPerson={addPerson}
        />
      </div>
    )
  }

  const handleLogout = () => {
    setUser(null)
    personService.setToken(user.token)
    window.localStorage.removeItem('loggedContactAppUser')
  }

  return (
    <div>
      <Error msg={error} />
      <h2>Phonebook</h2>
      {!user
        ? <LoginForm
            setError={setError}
            setUser={setUser}
          />
        : div()}

      <h3>Numbers</h3>
      <Persons
        persons={persons}
        search={search}
        setPersons={setPersons}
      />
    </div>
  )
}
