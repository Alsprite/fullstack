const User = (props) => {

  const blogsByUser = props.blogs.reduce((acc, blog) => {
    const user = blog.user.username;
    if (!acc[user]) {
      acc[user] = [];
    }
    acc[user].push(blog);
    return acc;
  }, {});

  const users = Object.keys(blogsByUser);

  return (
    <div>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Blogs</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => 
            <tr key={user}>
              <td>{user}</td>
              <td>
                <ul>
                  {blogsByUser[user].map(blog => 
                    <li key={blog.id}>{blog.title}</li>
                  )}
                </ul>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default User