import { useSelector, useDispatch } from 'react-redux'
import New from './components/AnecdoteForm'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (type, id) => {
    console.log(id)
    dispatch({ type, id })
  }
  //6.5
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
      <New />
    </div>
  )
}

export default App