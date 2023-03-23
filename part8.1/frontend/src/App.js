import { gql, useQuery } from '@apollo/client'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import Authors from './components/authors'
import Books from './components/books'

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      id
      born
      bookCount
    }
  }
`

const App = () => {
  const { loading, data } = useQuery(ALL_AUTHORS)
  const padding = {
    padding: 5
  }
  console.log(data)

  return (
    <Router>
    <div>
      <Link style={padding} to="/"></Link>
      <Link style={padding} to="/authors">Authors</Link>
      <Link style={padding} to="/books">Books</Link>
    </div>

    <Routes>
      <Route path="/authors" element={<Authors loading={loading} data={data}/>} />
      <Route path="/books" element={<Books />} />
    </Routes>
    </Router>
  )
}

export default App