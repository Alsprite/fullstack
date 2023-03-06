import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, createAnecdote, updateAnecdote } from './requests'

const App = () => {
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
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
    <div>
      <h2>Anecdotes</h2>
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
            <button onClick={() => voteAnecdote(anecdote.id, anecdote.votes)}>Vote</button>
          </div>
          </div>
        )}
    </div>
  )
}

export default App