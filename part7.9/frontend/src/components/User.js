const User = (props) => {
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
        {users.map(user => (
          <div key={user}>
            <h2>{user}</h2>
            <h3>added blogs</h3>
            <ul>
              {blogsByUser[user].map(blog => (
                <li key={blog.id}>{blog.title}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    )
  }
  
  export default User