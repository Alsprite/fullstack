import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const Authors = (props) => {
    const [name, setName] = useState('')
    const [born, setBorn] = useState(0)

    const [changeBirth] = useMutation(EDIT_AUTHOR, {
      refetchQueries: [{query: ALL_AUTHORS}]
    })

    const changeYear = (event) => {
        event.preventDefault()
        changeBirth({ variables: { name, born }})
        
        setName('')
        setBorn(0)
    }
    if (props.loading)  {
            return <div>loading...</div>
        }

    return (
    <div>
        <h1>Authors</h1>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {props.authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
            )}
        </tbody>
      </table>
      <h1>Set birthyear</h1>
      <form onSubmit={changeYear}>
        <input placeholder="name" value={name} onChange={(e) => setName(e.target.value)}/>
        <br></br>
        <input placeholder="born" type="number" value={born} onChange={(e) => setBorn(parseInt(e.target.value))}/>
        <br></br>
        <button type="submit">update author</button>
      </form>
    </div>
    )
}

export default Authors