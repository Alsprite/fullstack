import { useDispatch, useSelector } from 'react-redux'

const Anecdote = ({anecdote}) => {
    const anecdotes = useSelector(state => state)
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
                has {anecdote.votes}
                <br></br>
                <button onClick={() => vote('VOTE', anecdote.id)}>vote</button>
              </div>
            </div>
          )}
        </div>
      )
}

export default Anecdote