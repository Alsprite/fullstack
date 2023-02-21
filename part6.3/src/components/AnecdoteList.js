import { useDispatch, useSelector } from 'react-redux'

const Anecdote = () => {
  const anecdotes = useSelector(state => {
    if (state.filter === '') {
      return state
    } else {
      console.log("joo")
    }
  })
  const dispatch = useDispatch()
    
  const vote = (type, id) => {
    console.log(id)
    dispatch({ type, id })
  }
    
  const sorter = (a, b) => b.votes - a.votes

  return (
    <div>
      {anecdotes.sort(sorter).map(anecdote =>
        <div key={anecdote.id}>
        <div>
        {anecdote.content}
        </div>
        <div>
        Votes: {anecdote.votes}
        <br></br>
        <button onClick={() => vote('VOTE', anecdote.id)}>Vote</button>
        </div>
        </div>
      )}
    </div>
  )
}

export default Anecdote