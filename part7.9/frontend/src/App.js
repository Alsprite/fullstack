import { useState, useEffect } from "react";
import blogService from "./services/blogs.js";
import loginService from "./services/login";
import Notification from "./components/Notification.js";
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getBlogs, createBlog, updateBlog } from './requests/blogs'

const App = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const queryClient = useQueryClient()

  const newBlogMutation = useMutation(createBlog, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('blogs')
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
    console.log(content)
    newBlogMutation.mutate(content)
  }
  const likeBlog = async (id, likes) => {
    const updatedBlog = {...blogs.find(blog => blog.id === id), likes: likes + 1}
    await updatedBlogMutation.mutateAsync(updatedBlog)
    queryClient.invalidateQueries('blogs')
  }

  useEffect(() => {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 5000);
      return () => {
        clearTimeout(timer);
      };
    }, [message]);

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
      setMessage("error" + exception.response.data.error);
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
        <Notification message={message}></Notification>
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
        <Notification message={message} />
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
        {blogs.slice().map(blog => 
        <div key={blog.id}>
          <div>
            <br></br>
            <h2>{blog.title} by {blog.author}</h2>
            <p>Votes: {blog.likes}</p>
            <button onClick={likeBlog}>Vote</button>
          </div>
          </div>
        )}
      </div>
    )
  }
}

export default App;
