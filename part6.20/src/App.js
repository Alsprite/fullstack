import { useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, createAnecdote, updateAnecdote } from './requests'
import Notification from './components/Notification'
import { useReducer } from 'react'
import messageContext from './Context'

const counterMessage = (state, action) => {
  switch (action.type) {
    case 'LIKE':
      console.log(action.type)
      return `Anecdote '${action.name}' voted`
    case 'CREATE':
      console.log(action.type)
      return `Anecdote '${action.name}' created`
    case 'CLEAR':
      return null
    default: 
    return state
  }
}

const App = () => {
  const [message, counterDispatch] = useReducer(counterMessage, null)

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        counterDispatch({type: 'CLEAR'})
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [message])

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('anecdotes')
      counterDispatch({type: 'CREATE', name: data.content})
    }
  })

  const updatedAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })

  const result = useQuery('anecdotes', getAnecdotes)
  console.log(result)

  if (result.isLoading) {
    return <div>loading data...</div>
  }
  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content})
  }
  const voteAnecdote = async (id, votes) => {
    const updatedAnecdote = { ...anecdotes.find(a => a.id === id), votes: votes + 1 };
    await updatedAnecdoteMutation.mutateAsync(updatedAnecdote);
    queryClient.invalidateQueries('anecdotes');
  };

  return (
    <messageContext.Provider value={[message, counterDispatch]}>
      <h2>Anecdote App</h2>
      <Notification />
      <h4>Create new</h4>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button type="submit">Create</button>
      </form>
      <br></br>
      {anecdotes.slice().map(anecdote => 
        <div key={anecdote.id}>
          <div>
            <br></br>
            {anecdote.content}
            <p>Votes: {anecdote.votes}</p>
            <button onClick={() => {voteAnecdote(anecdote.id, anecdote.votes); counterDispatch({type: 'LIKE', name: anecdote.content})}}>Vote</button>
          </div>
          </div>
        )}
    </messageContext.Provider>
  )
}

export default App