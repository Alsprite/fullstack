import { gql, useQuery, useApolloClient } from '@apollo/client'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Authors from './components/authors'
import Books from './components/books'
import Addbook from './components/addbook'
import LoginForm from './components/loginForm'
import { useState } from 'react';

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

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
  console.log(allAuthors.data.allAuthors)

  if (!token) {
    return (
      <div>
        <h2>Login</h2>
        <LoginForm
          setToken={setToken}
        />
      </div>
    )
  }

  return (
    <Router>
    <div>
      <Link style={padding} to="/"></Link>
      <Link style={padding} to="/authors">Authors</Link>
      <Link style={padding} to="/books">Books</Link>
      <Link style={padding} to="/addBook">Add book</Link>
      <button onClick={logout}>Log out</button>
    </div>

    <Routes>
      <Route path="/authors" element={<Authors authors={allAuthors.data.allAuthors}/>} />
      <Route path="/books" element={<Books />} />
      <Route path="/addBook" element={<Addbook />} />
    </Routes>
    </Router>

  )
}

export default App