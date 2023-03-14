import { useState, useEffect, useReducer } from "react";
import messageContext from './Context.js'
import blogService from "./services/blogs.js";
import loginService from "./services/login";
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getBlogs, createBlog, updateBlog } from './requests/blogs'

const messageReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_ERROR':
    return `Wrong credentials`
    case 'BLOG_CREATE':
    return `Blog ${action.name} added`
    case 'BLOG_LIKE':
      return `Blog ${action.name} liked`
    case 'CLEAR':
      return null
    default: 
    return state
  }
}

const App = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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

  const result = useQuery('blogs', getBlogs)

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }
  
  const blogs = result.data

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      let uid = username;
      let pas = password;
      const user = await loginService.login({
        username: uid,
        password: pas,
      });
      blogService.setToken(user.token);
      setUser(user);
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
    } catch (exception) {
      counterDispatch({type: 'LOGIN_ERROR'})
    }
  };
  const handleLogOut = async (event) => {
    event.preventDefault();
    window.localStorage.removeItem('loggedUser');
    setUser(null);
    blogService.setToken(null)
  };
  
  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <messageContext.Provider value={[message, counterDispatch]}>{message}</messageContext.Provider>
        <form name='log' onSubmit={handleLogin}>
          <p>Username</p>
          <input
            type='text'
            name='nimi'
            id='nameid'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          ></input>
          <p>Password</p>
          <input
            type='password'
            name='pass'
            id='passid'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          ></input>
        </form>
        <button type='submit' id='login-btn' onClick={handleLogin}>
          Log in
        </button>
      </div>
    );
  } else {
    return (
      <div>
        <h2>blogs</h2>
        <p>{user.name} logged in</p>
        <button onClick={handleLogOut}>Log out</button>
        <h4>Create new</h4>
        <form name="blog" onSubmit={addBlog}>
          <input name="title"/>
          <br></br>
          <input name="author"/>
          <br></br>
          <input name="url"/>
          <br></br>
          <button type="submit">Create</button>
        </form>
        <messageContext.Provider value={[message, counterDispatch]}><p>{message}</p></messageContext.Provider>
        {blogs.slice().map(blog => 
        <div key={blog.id}>
          <div>
            <br></br>
            <h2>{blog.title} by {blog.author}</h2>
            <p>Url: {blog.url}</p>
            <p>Likes: {blog.likes}</p>
            <button onClick={() => {likeBlog(blog.id); counterDispatch({type: 'BLOG_LIKE', name: blog.title})}}>Vote</button>
          </div>
          </div>
        )}
      </div>
    )
  }
}

export default App;
