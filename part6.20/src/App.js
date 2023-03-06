import { useQuery } from 'react-query'
import axios from 'axios'

const App = () => {
  const result = useQuery('anecdotes', () => axios.get('http://localhost:3001/anecdotes').then(res => res.data))
  console.log(result)

  if (result.isLoading) {
    return <div>loading data...</div>
  }
  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.slice().map(anecdote => 
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          </div>
        )}
    </div>
  )
}

export default App