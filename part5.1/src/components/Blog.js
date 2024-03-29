import blogService from '../services/blogs.js'
import { useState } from 'react'
const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  const loggedUser = JSON.parse(localStorage.getItem('loggedUser'))

  const addLike = async event => {
    event.preventDefault()
    const likes = blog.likes + 1
    const newBlog = { blog, likes }
    await blogService.update(blog.id, newBlog)
  }
  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      blogService.remove(blog.id)
    }
  }
  const toggleVisibility = () => {
    setVisible(!visible)
  }
  return (
    <div>
      <div id={blog.title}>
        <h3>{blog.title} by {blog.author} <button id="view-btn" onClick={toggleVisibility}> {visible ? 'hide' : 'show'} </button></h3>
      </div>
      {visible && (
        <div id="extra">
          <h4>Url: {blog.url} </h4>
          <h4>Likes: {blog.likes} <button id="like-btn" onClick={addLike}>Like</button></h4>
          <h4>Added by: {blog.user.name}</h4>
          {blog.user.username === loggedUser.username && (
            <button id="delete-btn" onClick={handleDelete}>Delete</button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog