import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table';

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
        <Table striped>
          <tbody>
            {props.blogs.slice().map(blog =>
              <tr key={blog.id}>
                <td>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </td>
              </tr>  
            )}
          </tbody>
        </Table>
        </div>
    )
}

export default Blog