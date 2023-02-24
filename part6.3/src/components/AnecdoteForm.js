import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { initialization } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const New = () => {
    const dispatch = useDispatch()
    
    const newAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = "";
        const newAnecdote = await anecdoteService.createNew(content)
        dispatch(createAnecdote(newAnecdote))
        dispatch(initialization(`New anecdote added: ${content}`, 5000))
      }
    
    return (
        <div>
            <h2>Create new</h2>
            <form onSubmit={newAnecdote}>
                <div><input name="anecdote"/><button type="submit">Create</button></div>
            </form>
        </div>
    )
}

export default New