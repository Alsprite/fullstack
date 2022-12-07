import ReactDOM from 'react-dom/client'
import App from './App'
import express from 'express'
import axios from 'axios'
import { application } from 'express'

app.use(express.static('build'))

axios.get('http://localhost:3001/notes').then(response => {
  const notes = response.data
  ReactDOM.createRoot(document.getElementById('root')).render(
    <App notes={notes} />
  )
})