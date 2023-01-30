import blogService from '../services/blogs'

const Blog = ({blog, deleteBlog}) => {
  const addLike = async event => {
    event.preventDefault()
    const likes = blog.likes + 1
    const newBlog = {...blog, likes}
    await blogService.update(blog.id, newBlog)
  }
  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      blogService.remove(blog.id)
    }
  }
  return (
  <div>
    <h3>Title: {blog.title} <br></br> Author: {blog.author} <br></br> Url: {blog.url} <br></br> Likes: {blog.likes} <button type="submit" onClick={addLike}>Like</button></h3>
    <button type="submit" onClick={handleDelete}>Delete</button>
  </div>  
  )
}

export default Blog