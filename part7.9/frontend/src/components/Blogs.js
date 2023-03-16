import { Link } from 'react-router-dom'

const Blog = (props) => {
    return (
        <div>
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
            <h2><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></h2>
          </div>
          </div>
        )}
        </div>
    )
}

export default Blog