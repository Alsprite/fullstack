import { useEffect, useReducer } from "react";
import messageContext from './Context.js'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getBlogs, createBlog, updateBlog, removeBlog } from './requests/blogs'
import { loginUser } from './requests/users'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Blog from './components/Blogs'
import User from './components/Users'

var loggedIn = false
var loggedInUID = ""

const messageReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_ERROR':
    return `Wrong credentials`
    case 'BLOG_CREATE':
    return `Blog ${action.name} added`
    case 'BLOG_LIKE':
      return `Blog ${action.name} liked`
    case 'BLOG_DELETE':
      return `Blog deleted`
    case 'CLEAR':
      return null
    default: 
    return state
  }
}

const App = () => {
  const [message, counterDispatch] = useReducer(messageReducer, null)

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        counterDispatch({type: 'CLEAR'})
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [message])

  const queryClient = useQueryClient()

  const newBlogMutation = useMutation(createBlog, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('blogs')
      counterDispatch({type: 'BLOG_CREATE', name: data.title})
    }
  })
  const updatedBlogMutation = useMutation(updateBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    }
  })
  const deleteMutation = useMutation(removeBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs');
    }
  })

  const loginMutation = useMutation(loginUser, {
    onError: (error) => {
      counterDispatch({ type: 'LOGIN_ERROR' })
    },
    onSuccess: (data) => {
      loggedIn = true
      loggedInUID = data.name
    },
  })

  const addBlog = async (event) => {
    event.preventDefault()
    const content = ({
      title: document.forms['blog']['title'].value,
      author: document.forms['blog']['author'].value,
      url: document.forms['blog']['url'].value
    })
    document.forms['blog']['title'].value = ''
    document.forms['blog']['author'].value= ''
    document.forms['blog']['url'].value = ''
    console.log(content)
    newBlogMutation.mutate(content)
  }
  const likeBlog = async (id) => {
    const blogs = queryClient.getQueryData('blogs')
    const updatedBlog = {...blogs.find(blog => blog.id === id), likes: blogs.find(blog => blog.id === id).likes + 1}
    await updatedBlogMutation.mutateAsync(updatedBlog)
    queryClient.invalidateQueries('blogs')
  }
  const handleDelete = async (id) => {
    deleteMutation.mutate(id)
    queryClient.invalidateQueries('blogs')
  }

  const result = useQuery('blogs', getBlogs)

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }
  
  const blogs = result.data

  const handleLogin = (event) => {
    event.preventDefault()

    const credentials = {
      username: event.target.username.value,
      password: event.target.password.value,
    }

    loginMutation.mutate(credentials)
  }

  const handleLogOut = (event) => {
    event.preventDefault()
    loggedIn = false
    loggedInUID = ""
  }
  
  if (loggedIn === false) {
    return (
      <div>
        <h2>Log in to application</h2>
        <messageContext.Provider value={[message, counterDispatch]}>{message}</messageContext.Provider>
        <form onSubmit={handleLogin}>
          <input type="text" name="username" placeholder="Username"/>
          <br></br>
          <input type="password" name="password" placeholder="Password"/>
          <br></br>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  } else {
    return (
      <div>
        <messageContext.Provider value={[message, counterDispatch]}><p>{message}</p></messageContext.Provider>
        <Router>
          <div>
            <Link to="/">Blogs </Link>
            <Link to="/users">Users</Link>
          </div>
        <Routes>
          <Route path="/" element={<Blog loggedInUID={loggedInUID} handleLogOut={handleLogOut} addBlog={addBlog} blogs={blogs} handleDelete={handleDelete} likeBlog={likeBlog} counterDispatch={counterDispatch} />} />
          <Route path="/users" element={<User />} />
        </Routes>
      </Router>
      </div>
    )
  }
}

export default App