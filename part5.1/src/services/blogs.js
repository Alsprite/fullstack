import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const config = { headers: { Authorization: token } }

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newObject, auth) => {
  setToken(auth)
  const config = { headers: { Authorization: token } }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const remove = (id, auth) => {
  setToken(auth)
  const authoriz = { headers: { Authorization: token } }

  console.log('auth', auth)
  console.log('config', config)

  const request = axios.delete(`${baseUrl}/${id}`, authoriz)
  return request.then(response => response.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, update, setToken, remove }