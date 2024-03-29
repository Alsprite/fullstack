const BlogForm = ({ createBlog }, props) => {
  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      user: props.user,
      title: document.forms['blog']['title'].value,
      author: document.forms['blog']['author'].value,
      url: document.forms['blog']['url'].value
    })
  }

  return (
    <div>
      <h2>Create a new blog</h2>

      <form name="blog" onSubmit={addBlog}>
        <label>Title:</label>
        <input type="text" name="title" id="title" ></input>
        <br></br>
        <label>Author:</label>
        <input type="text" name="author" id="author" ></input>
        <br></br>
        <label>Url:</label>
        <input type="text" name="url" id="url" ></input>
        <br></br>
        <button type="submit">Create</button>
        <br></br>
      </form>
    </div>
  )
}

export default BlogForm