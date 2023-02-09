import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm.js'
import blogService from './services/blogs.js'
import loginService from './services/login'
import Notification from './components/Notification.js'
import Togglable from './components/Togglable.js'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    const alreadyUser = window.localStorage.getItem('loggedUser')
    if (alreadyUser) {
      const user = JSON.parse(alreadyUser)
      setUser(user)
      blogService.getAll().then(blogs => setBlogs(blogs))
    }
  }, [])
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(null)
    }, 5000)
    return () => {
      clearTimeout(timer)
    }
  }, [message])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      let uid = document.forms['log']['nimi'].value
      let pas = document.forms['log']['pass'].value
      const user = await loginService.login({
        username: uid,
        password: pas
      })
      blogService.setToken(user.token)
      setUser(user)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
    } catch (exception) {
      setMessage('error' + exception.response.data.error)
    }
  }
  const handleLogOut = async event => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }
  const addBlog = (blogObject) => {
    const auth = user.token
    try {
      blogService.create(blogObject, auth).then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        blogFormRef.current.toggleVisibility()
        setMessage(`A new blog ${blogObject.title} by ${blogObject.author} added`)
      })
    } catch (exception) {
      setMessage('error' + exception.response.data.error)
    }
  }
  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message}></Notification>
        <form name="log" onSubmit={handleLogin}>
          <p>Username</p>
          <input type="text" name="nimi" id="nameid" onChange={console.log('jee')} ></input>
          <p>Password</p>
          <input type="password" name="pass" id="passid" onChange={console.log('joo')} ></input>
        </form>
        <button type="submit" id="login-btn" onClick={handleLogin}>Log in</button>
      </div>
    )
  } else {
    return (
      <div>
        <h2>blogs</h2>
        <Notification message={message} />
        <p>{user.username} logged in</p>
        <button onClick={handleLogOut}>Log out</button>
        <Togglable buttonLabel="New blog" ref={blogFormRef}>
          <BlogForm createBlog={addBlog}></BlogForm>
        </Togglable>
        {blogs.sort((a, b) => b.likes - a.likes).map((blog) => (
          <Blog key={blog.id} blog={blog}></Blog>
        )
        )
        }
      </div>
    )
  }
}

export default App