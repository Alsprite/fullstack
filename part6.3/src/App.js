import { useSelector, useDispatch } from 'react-redux'
import { createAnecdote } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (type, id) => {
    console.log(id)
    dispatch({ type, id })
  }
  const newAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = "";
    dispatch(createAnecdote(content))
  }

  const sorter = (a, b) => b.votes - a.votes
  
  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.sort(sorter).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <br></br>
            <button onClick={() => vote('VOTE', anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={newAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit" >create</button>
      </form>
    </div>
  )
}

export default App