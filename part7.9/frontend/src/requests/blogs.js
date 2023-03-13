import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/blogs'

export const getBlogs = () =>
  axios.get(baseUrl).then(res => res.data)

export const createBlog = async (content) => {
    console.log(content)
    const jtn1 = window.localStorage.getItem('loggedUser')
    const jtn2 = JSON.parse(jtn1)
    const jtn3 = jtn2.token
    const config = {
        headers: { Authorization : `Bearer ${jtn3}`}
    }
    const response = await axios.post(baseUrl, content, config)
    return response.data
  }
export const updateBlog = async (updatedBlog) => {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }
    const response = await axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog, config)
    return response.data
  }