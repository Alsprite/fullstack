const { response } = require('express')
const express = require('express')
var morgan = require('morgan')
const app = express()

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456"
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523"
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendick",
    number: "39-23-6423122"
  }
]

app.use(express.json())

morgan.token("postData", (req) => {
  if (req.method === "POST") {
    return JSON.stringify(req.body)
  }

  return undefined
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'))

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/info', (req, res) => {
  res.send(`<h3>Phonebook has info for ${persons.length} persons <br> ${Date()} </h3>`)
})

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({ 
      error: 'Name missing' 
    })
  }
  if (!body.number) {
    return response.status(400).json({
      error: 'Number missing'
    })
  }
  if (body.name == persons.find(person => person.name)) {
    return response.status(400).json({
      error: 'Name must be unique'
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  persons = persons.concat(person)

  response.json(person)
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    res.send(person)
  } else {
    res.status(404).end()
  }
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})