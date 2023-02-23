import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { initialization } from '../reducers/notificationReducer'

const Anecdote = () => {
  const anecdotes = useSelector(state => {
    if (state.filter === '') {
      return state.anecdotes
    } else {
      return state.anecdotes.filter((anecdotes) => anecdotes.content.toLowerCase().includes(state.filter.toLowerCase()))
    }
  })

  const dispatch = useDispatch()

  const voteClick = (anecdote) => {
    dispatch(vote(anecdote.id))
    dispatch(initialization(`You voted ${anecdote.content}`, 5000))
  }
    
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
        <button onClick={() => voteClick(anecdote)}>Vote</button>
        </div>
        </div>
      )}
    </div>
  )
}

export default Anecdote