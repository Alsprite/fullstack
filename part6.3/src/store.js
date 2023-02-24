import { configureStore } from '@reduxjs/toolkit'
import anecdoteService from './services/anecdotes'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'
import anecdoteReducer, { setAnecdote } from './reducers/anecdoteReducer'

const store = configureStore({
    reducer: {
      anecdotes: anecdoteReducer,
      filter: filterReducer,
      notification: notificationReducer
    }
})

anecdoteService.getAll().then(anecdotes =>
  store.dispatch(setAnecdote(anecdotes))
)

export default store