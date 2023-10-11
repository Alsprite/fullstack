import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'

const Add = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')

  const ADD_BOOK = gql`
  mutation addBook($title: String!, $author: String!, $published: Int! , $genres: [String!]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
      author {
        name
      }
      published
      genres
    }
  }
`

  const [createBook] = useMutation(ADD_BOOK)

  const handleNewBook = (event) => {
    event.preventDefault()
    createBook({ variables: { title, author, published: parseInt(published), genres: [genre] } })

    setTitle('')
    setAuthor('')
    setPublished('')
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={handleNewBook}>
        <input placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <br></br>
        <input placeholder="author" value={author} onChange={(e) => setAuthor(e.target.value)} />
        <br></br>
        <input placeholder="published" type="number" value={published} onChange={(e) => setPublished(e.target.value)} />
        <br></br>
        <input placeholder="genre" value={genre} onChange={(e) => setGenre(e.target.value)} />
        <br></br>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default Add