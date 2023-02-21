import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const New = () => {
    const dispatch = useDispatch()

    const newAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = "";
        dispatch(createAnecdote(content))
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