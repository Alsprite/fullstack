/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null);
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
      setMessage(null);
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [message]);

  const handleLogin = async event => {
    event.preventDefault()
    try {
      let uid = document.forms["log"]["nimi"].value;
      let pas = document.forms["log"]["pass"].value;
      const user = await loginService.login({
      username: uid,
      password: pas
    })
    blogService.setToken(user.token)
    setUser(user)
    window.localStorage.setItem('loggedUser', JSON.stringify(user))
    } catch (exception) {
      setMessage("error" + exception.response.data.error);
    }
  }
  const handleLogOut = async event => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
      setUser(null)
  }
  const newBlog = async event => {
    event.preventDefault()
    try {
        const newB = {
        user: user,
        title: document.forms["blog"]["title"].value,
        author: document.forms["blog"]["author"].value,
        url: document.forms["blog"]["url"].value
      }
        const auth = user.token
        blogService.create(newB, auth).then(blog => {
        setBlogs(blogs.concat(blog))
        setMessage(`A new blog ${newB.title} by ${newB.author} added`)
    })
    } catch (exception) {
      setMessage("error" + exception.response.data.error);
    }
  }
  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message}></Notification>
        <form name="log" onSubmit={handleLogin}>
          <p>Username</p>
          <input type="text" name="nimi" onChange={console.log("jee")} ></input>
          <p>Password</p>
          <input type="password" name="pass" onChange={console.log("joo")} ></input>
        </form>
        <button type="submit" onClick={handleLogin}>Log in</button>
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
      <h2>create new</h2>
      <form name="blog">
        <label>Title:</label>
        <input type="text" name="title" ></input>
        <br></br>
        <label>Author:</label>
        <input type="text" name="author" ></input>
        <br></br>
        <label>Url:</label>
        <input type="text" name="url" ></input>
      </form>
      <button type="submit" onClick={newBlog}>Create</button>
      <br></br>
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
  }

  
}

export default App