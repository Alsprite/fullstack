import { useState } from 'react'

const BlogForm = ({ createBlog }, props) => {
  const [ setNewBlog ] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
        user: props.user,
        title: document.forms["blog"]["title"].value,
        author: document.forms["blog"]["author"].value,
        url: document.forms["blog"]["url"].value
    })

    setNewBlog('')
  }

  return (
    <div>
      <h2>Create a new blog</h2>

      <form name="blog">
        <label>Title:</label>
        <input type="text" name="title" ></input>
        <br></br>
        <label>Author:</label>
        <input type="text" name="author" ></input>
        <br></br>
        <label>Url:</label>
        <input type="text" name="url" ></input>
        <br></br>
        <button type="submit" onClick={addBlog}>Create</button>
        <br></br>
      </form>
    </div>
  )
}

export default BlogForm