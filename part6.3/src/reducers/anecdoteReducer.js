import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addVote(state, action) {
      const votedAnecdote = action.payload;
      const { id } = votedAnecdote;
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : votedAnecdote
      );
    },
    appendAnecdote(state, action) {
      return [...state, action.payload]
    },
    setAnecdote(state, action) {
      return action.payload
    }
  }
})

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdote(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const votedAnecdote = await anecdoteService.update(anecdote);
    dispatch(addVote(votedAnecdote));
  }
}

export const { addVote, appendAnecdote, setAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer