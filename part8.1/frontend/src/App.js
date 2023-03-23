import { gql, useQuery } from '@apollo/client'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import Authors from './components/authors'

const ALL_AUTHORS = gql`
  query {
    allAuthors  {
      name
      id
      born
      bookCount
    }
  }
`

const App = () => {
  const { loading, data } = useQuery(ALL_AUTHORS)

  if (loading)  {
    return <div>loading...</div>
  }
  console.log(data)
  return (
    <Router>
    <div>
      <Link to="/"></Link>
      <Link to="/authors">Authors</Link>
      <Link to="/books">Books</Link>
    </div>

    <Routes>
      <Route path="/authors" element={<Authors data={data}/>} />
    </Routes>
    </Router>
  )
}

export default App