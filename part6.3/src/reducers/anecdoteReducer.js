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
    }
  }
})

export const { createAnecdote, vote } = anecdoteSlice.actions
export default anecdoteSlice.reducer