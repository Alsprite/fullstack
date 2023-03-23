import { gql, useQuery } from '@apollo/client'

const Books = (props) => {

const ALL_BOOKS = gql`
    query {
    allBooks {
        title
        author {
        name
        }
    published
    id
    }
  }
`
    const { loading, data } = useQuery(ALL_BOOKS)
    console.log(data)

    if (loading) {
        return <div>loading...</div>
    }

    return (
    <div>
        <h1>books</h1>
        <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {data.allBooks.map(b =>
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
            )}
        </tbody>
      </table>
    </div>
    )
}

export default Books