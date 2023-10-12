import { gql, useQuery } from '@apollo/client'

const FAVORITE_GENRE = gql` {
    me {
        favoriteGenre
    }
}`
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

const Recommend = (props) => {
    const books = useQuery(ALL_BOOKS)
    const favorite = useQuery(FAVORITE_GENRE)
    if (favorite.loading || books.loading) {
        return <div>loading...</div>
    }

    const favoriteGenre = favorite.data.me.favoriteGenre

    const filteredBooks = books.data.allBooks.filter((book) => book.genres.includes(favoriteGenre));

    return (
        <div>
            <h2>recommendations</h2>
            <p>books in your favorite genre: {favoriteGenre}</p>
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

export default Recommend