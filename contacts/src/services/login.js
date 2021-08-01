import axios from 'axios'
const baseUrl = '/api/login'

const login = async credententials => {
  const { data } = await axios.post(baseUrl, credententials)
  return data
}

export default login
