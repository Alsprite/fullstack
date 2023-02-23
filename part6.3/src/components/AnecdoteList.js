import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const Anecdote = () => {
  const anecdotes = useSelector(state => {
    if (state.filter === '') {
      return state.anecdotes
    } else {
      return state.anecdotes.filter((anecdotes) => anecdotes.content.toLowerCase().includes(state.filter.toLowerCase()))
    }
  })

  const dispatch = useDispatch()
    
  const sorter = (a, b) => b.votes - a.votes

  return (
    <div>
      {anecdotes.slice().sort(sorter).map(anecdote =>
        <div key={anecdote.id}>
        <div>
        {anecdote.content}
        </div>
        <div>
        Votes: {anecdote.votes}
        <br></br>
        <button onClick={() => dispatch(vote(anecdote.id))}>Vote</button>
        </div>
        </div>
      )}
    </div>
  )
}

export default Anecdote