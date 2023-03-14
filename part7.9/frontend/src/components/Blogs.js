const Blog = (props) => {
    return (
        <div>
        <h2>Blogs</h2>
        <button onClick={props.handleLogOut}>Log out</button>
        <h4>Create new</h4>
        <form name="blog" onSubmit={props.addBlog}>
          <input name="title"/>
          <br></br>
          <input name="author"/>
          <br></br>
          <input name="url"/>
          <br></br>
          <button type="submit">Create</button>
        </form>
        {props.blogs.slice().map(blog => 
        <div key={blog.id}>
          <div>
            <br></br>
            <h2>{blog.title} by {blog.author} <button onClick={() => props.handleDelete(blog.id)}>Delete</button></h2>
            <p>Url: {blog.url}</p>
            <p>Likes: {blog.likes}</p>
            <button onClick={() => {props.likeBlog(blog.id); props.counterDispatch({type: 'BLOG_LIKE', name: blog.title})}}>Vote</button>
          </div>
          </div>
        )}
        </div>
    )
}

export default Blog