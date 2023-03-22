import { gql, useQuery } from '@apollo/client'

const ALL_BOOKS = gql`
  query {
    allBooks  {
      title
      author
      published
      genres
    }
  }
`

const App = () => {
  const { loading, data } = useQuery(ALL_BOOKS)

  if (loading)  {
    return <div>loading...</div>
  }

  return (
    <div>
      {data.allBooks.map(book => (
        <div key={book.title}>
          <h2>{book.title}</h2>
          <p>{book.author}</p>
          <p>{book.published}</p>
          <p>{book.genres.join(', ')}</p>
        </div>
      ))}
    </div>
  )
}

export default App