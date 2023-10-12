import { gql, useQuery } from '@apollo/client'
import { useState } from 'react'

const Books = (props) => {
const [genresToShow, setGenresToShow] = useState(null)

const ALL_BOOKS = gql`
    query {
      allBooks {
        title
        author {
          name
          born
          bookCount
        }
        published
        genres
        id
      }
  }
`
    const { loading, data } = useQuery(ALL_BOOKS)

    if (loading) {
        return <div>loading...</div>
    }
    const handleGenreChange = (event) => {
      setGenresToShow(event.target.value)
    }
  
    const filteredBooks = genresToShow
      ? data.allBooks.filter(book => book.genres.includes(genresToShow))
      : data.allBooks

    return (
      <div>
      <h1>Books</h1>
      <p>Filter by genre:</p>
      <select onChange={handleGenreChange}>
        <option value="">All Genres</option>
        {data.allBooks
          .flatMap(book => book.genres)
          .filter((genre, index, self) => self.indexOf(genre) === index)
          .map(genre => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
      </select>
      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {filteredBooks.map(b => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    )
}

export default Books