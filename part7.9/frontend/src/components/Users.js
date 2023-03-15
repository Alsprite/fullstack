import { Link } from 'react-router-dom'

const Users = (props) => {

  const blogsByUser = props.blogs.reduce((acc, blog) => {
    const user = blog.user.username
    if (!acc[user]) {
      acc[user] = []
    }
    acc[user].push(blog)
    return acc
  }, {})

  const users = Object.keys(blogsByUser);

  return (
    <div>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <tr key={user}>
              <Link to={`/users/${blogsByUser[user].id}`}>
              <td>{user}</td>
              </Link>
              <td>{blogsByUser[user].length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Users