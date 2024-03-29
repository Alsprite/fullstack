import { useQuery, useApolloClient, useSubscription } from '@apollo/client'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Authors from './components/authors'
import Books from './components/books'
import Addbook from './components/addbook'
import LoginForm from './components/loginForm'
import Recommend from './components/recommend'
import { useState, useEffect } from 'react'
import { ALL_AUTHORS, BOOK_ADDED, ALL_BOOKS } from './queries'

const App = () => {
  const result = useQuery(ALL_BOOKS)
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  useEffect(() => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }, [client])
  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      try {
        const addedBook = data.data.bookAdded
        window.alert(`Book ${addedBook.title} has been added.`)
        client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
          return {
            allBooks: allBooks.concat(addedBook),
          }
        })
      } catch (error) {
        console.log(error.message)
      }
    }
  })
  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }
  
  const allAuthors = useQuery(ALL_AUTHORS)
  const padding = { padding: 5, textDecoration: 'none', color: "black" }

  if (allAuthors.loading) {
    return <div>loading...</div>
  }
  if (result.loading) {
    return <div>loading...</div>
  }
  return (
    <Router>
    <div>
      <Link style={padding} to="/"></Link>
      <button><Link style={padding} to="/authors">Authors</Link></button>
      <button><Link style={padding} to="/books">Books</Link></button>
      <button><Link style={padding} to="/addBook">Add book</Link></button>
      {token ? (
        <>
        <button><Link style={padding} to="/recommend">recommend</Link></button>
        <button><Link style={padding} to="/" onClick={logout}>Log out</Link></button>
        </>
      ) : (
        <button><Link style={padding} to="/login">Log in</Link></button>
      )}
    </div>

    <Routes>
      <Route path="/authors" element={<Authors authors={allAuthors.data.allAuthors}/>} />
      <Route path="/books" element={<Books />} />
      <Route path="/addBook" element={<Addbook client={client} />} />
      <Route path="/login" element={<LoginForm setToken={setToken} />} />
      <Route path="/recommend" element={<Recommend token={token}/>} />
    </Routes>
    </Router>
  )
}

export default App