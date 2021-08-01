import axios from 'axios'
const baseUrl = '/api/persons'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNote = async (newPerson) => {
  const headers = {
    headers: {
      Authorization: token
    }
  }
  const response = await axios.post(baseUrl, newPerson, headers)
  return response.data
}

const update = (id, newPerson) => {
  const headers = {
    headers: {
      Authorization: token
    }
  }
  const response = axios.put(`${baseUrl}/${id}`, newPerson, headers)
  return response.data
}

export default {
  getAll,
  createNote,
  update,
  setToken
}
