import React, { useState } from 'react'
import Toggable from './Toggable'
import personService from '../services/persons'
import loginService from '../services/login'

export const LoginForm = ({ setUser, setError }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService({
        username,
        password
      })
      personService.setToken(user.token)
      window.localStorage.setItem(
        'loggedContactAppUser', JSON.stringify(user)
      )
      setUser(user)
      setPassword('')
      setUsername('')
    } catch (err) {
      console.error(err)
      setError('Wrong credentials')
      setTimeout(() => {
        setError(null)
      }, 3000)
    }
  }

  return (
    <div>
      <Toggable buttonlabel='show login'>
        <form onSubmit={handleLogin}>
          <div>
            <input
              type='text'
              value={username}
              name='Username'
              placeholder='Username'
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div>
            <input
              type='password'
              value={password}
              name='Password'
              placeholder='Password'
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div>
            <button>
              Login
            </button>
          </div>
        </form>
      </Toggable>
    </div>
  )
}
