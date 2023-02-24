import { createSlice } from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      const newAnecdote = {
        content: action.payload.content,
        id: getId(),
        votes: 0
      }
      return [...state, newAnecdote]
    },
    vote(state, action) {
      const id = action.payload
      const update = state.find(anecdote => anecdote.id === id)
      const change = {
        ...update,
        votes: update.votes + 1
      }
      return state.map(anecdote => anecdote.id !== id ? anecdote : change)
    },
    appendAnecdote(state, action) {
      return state.push(action.payload)
    },
    setAnecdote(state, action) {
      return action.payload
    }
  }
})

export const { createAnecdote, vote, appendAnecdote, setAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer