const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
app.use(express.static('dist'))
// Middleware to parses JSON
app.use(express.json())
// app.use(bodyParser.json())
// app.use(morgan('tiny'))
morgan.token('request-body', (req, res) => {
  return JSON.stringify(req.body)
})
app.use(cors())

app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms', '-',
    tokens['request-body'](req, res)
  ].join(' ')
}))



let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/info', (request, response) => { 
    const time = new Date()
    response.send(`<p>Phonebook has infor for ${persons.length} people</p><p>${time}</p>`)
    
})

app.post('/api/persons', (request, response) => {
    const id = Math.random() * 1000000
    const body = request.body
    if (!body.name || !body.number) {
        return response.status(404).json({ error: 'name or number missing' })
    } else if (persons.find(person => person.name === body.name)) {
        return response.status(404).json({error: `${body.name} is already added on phonebook. Name must be unique`})
    } else {
        const newPerson = {
            id: id,
            name: body.name,
            number: body.number
        }
        persons = persons.concat(newPerson)
        response.json(persons)
    }
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(n => n.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(n => n.id !== id)
  response.send("Successfully deleted")
  response.status(204).end()
})

// app.get('/api/persons/:id', (request, response) => {
//     const id = Number(request.params.id)
//     const person = persons.find(person => person.id === id)
// })



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
