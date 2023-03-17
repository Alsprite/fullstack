import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/blogs'

const token = window.localStorage.getItem('token')

export const getBlogs = () => 
  axios.get(baseUrl).then(res => res.data)


export const createBlog = async (content) => {
    console.log(content)
    const config = {
        headers: { Authorization : `Bearer ${token}`}
    }
    console.log(config)
    const response = await axios.post(baseUrl, content, config)
    return response.data
  }
export const updateBlog = async (updatedBlog) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    const response = await axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog, config)
    return response.data
  }
export const removeBlog = async (id) => {
    const authoriz = { headers: { Authorization: `Bearer ${token}` } }
    const request = axios.delete(`${baseUrl}/${id}`, authoriz)
    const response = await request
    return response.data
  }
  export const getComments = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}/comments`)
    return response.data
  }

export const addComment = async (id, comment) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  console.log(comment)
  const request = await axios.post(`${baseUrl}/${id}/comments`, comment, config)
  console.log(request)
  return request.data
}