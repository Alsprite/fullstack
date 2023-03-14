const User = (props) => {
    console.log(props.blogs)
    return (
        <div>
        <h1>Users</h1>
        <ul>
        {props.blogs.map((user, index) => (
          <li key={index}>{user)}</li>
        ))}
      </ul>
        </div>
    )
}
export default User