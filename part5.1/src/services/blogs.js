import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const config = { headers: { Authorization: token } }

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async (newObject, auth) => {
  setToken(auth)
  const config = { headers: { Authorization: token } }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}
const update = async (id, newObject) => {
  const request = await axios.put(`${baseUrl}/${id}`, newObject)
  return request.data
}

const remove = async (id, auth) => {
  setToken(auth)
  const authoriz = { headers: { Authorization: token } }
  console.log('auth', auth)
  console.log('config', config)
  const request = axios.delete(`${baseUrl}/${id}`, authoriz)
  const response = await request
  return response.data
}

export default { getAll, create, update, setToken, remove }