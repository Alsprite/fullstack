/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    let uid = document.forms["log"]["nimi"].value;
    let pas = document.forms["log"]["pass"].value;
    const user = await loginService.login({
      username: uid,
      password: pas
    })
    blogService.setToken(user.token)
    setUser(user)
  }
  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form name="log" onSubmit={handleLogin}>
          <p>Username</p>
          <input type="text" name="nimi" onChange={handleLogin} ></input>
          <p>Password</p>
          <input type="password" name="pass" onChange={handleLogin} ></input>
        </form>
      </div>
    )
  } else {
    return (
    <div>
      <h2>blogs</h2>
      <p>{user.username} logged in</p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
  }

  
}

export default App