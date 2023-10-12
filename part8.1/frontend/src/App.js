import { useQuery, useApolloClient } from '@apollo/client'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Authors from './components/authors'
import Books from './components/books'
import Addbook from './components/addbook'
import LoginForm from './components/loginForm'
import Recommend from './components/recommend'
import { useState } from 'react';
import { ALL_AUTHORS } from './queries'

const App = () => {
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }
  const allAuthors = useQuery(ALL_AUTHORS)
  const padding = { padding: 5 }

  if (allAuthors.loading) {
    return <div>loading...</div>
  }

  return (
    <Router>
    <div>
      <Link style={padding} to="/"></Link>
      <Link style={padding} to="/authors">Authors</Link>
      <Link style={padding} to="/books">Books</Link>
      <Link style={padding} to="/addBook">Add book</Link>
      <Link style={padding} to="/recommend">recommend</Link>
      {token ? (
          <Link style={padding} to="/" onClick={logout}>
            Log out
          </Link>
        ) : (
          <Link style={padding} to="/login">
            Log in
          </Link>
        )}
      </div>

    <Routes>
      <Route path="/authors" element={<Authors authors={allAuthors.data.allAuthors}/>} />
      <Route path="/books" element={<Books />} />
      <Route path="/addBook" element={<Addbook />} />
      <Route path="/login" element={<LoginForm setToken={setToken} />} />
      <Route path="/recommend" element={<Recommend token={token}/>} />
    </Routes>
    </Router>

  )
}

export default App