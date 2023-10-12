import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_BOOK } from '../queries'

const Add = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [createBook] = useMutation(ADD_BOOK)

  const handleNewBook = (event) => {
    event.preventDefault()
    createBook({ variables: { title, author, published: parseInt(published), genres: genres } })

    setTitle('')
    setAuthor('')
    setPublished('')
    setGenres([]) 
    setGenre('')
  }

  const addGenre = () => {
    if(genre !== '') {
      setGenres(genres.concat(genre))
      setGenre('')
    }
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
        <button type="button" onClick={addGenre}>add genre</button>
        <div>genres: {genres.join(' ')}</div>
        <br></br>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default Add