import blogService from '../services/blogs'

const Blog = ({blog}) => {
  const addLike = async event => {
    event.preventDefault()
    const likes = blog.likes + 1
    const newBlog = {...blog, likes}
    await blogService.update(blog.id, newBlog)
  }
  return (
  <div>
    <h3>Title: {blog.title} <br></br> Author: {blog.author} <br></br> Url: {blog.url} <br></br> Likes: {blog.likes} </h3>
    <button type="submit" onClick={addLike}>Like</button>
  </div>  
  )
}

export default Blog