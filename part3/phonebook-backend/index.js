const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const Info = require ('./models/info')
require('dotenv').config()

const app = express()
app.use(express.static('dist'))
app.use(express.json())
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

const errorHandler = (error, request, response, next) => { 
  console.log(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id'})
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }
  next(error)
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// let persons = [
//     { 
//       "id": 1,
//       "name": "Arto Hellas", 
//       "number": "040-123456"
//     },
//     { 
//       "id": 2,
//       "name": "Ada Lovelace", 
//       "number": "39-44-5323523"
//     },
//     { 
//       "id": 3,
//       "name": "Dan Abramov", 
//       "number": "12-43-234345"
//     },
//     { 
//       "id": 4,
//       "name": "Mary Poppendieck", 
//       "number": "39-23-6423122"
//     }
// ]

app.get('/api/persons', (request, response) => {
  Person.find({}).then(result => {
    response.json(result)
    console.log("log get person: ", result);

  })
})

app.get('/info', (request, response) => {
  Info.find({}).then(result => {
    response.json(result)
  })
})

app.get('/api/info', (request, response, next) => { 
    const time = new Date()
    response.send(`<p>Phonebook has infor for ${persons.length} people</p><p>${time}</p>`)
    
})

app.post('/api/persons', (request, response, next) => {
  const newPerson = new Person({
    name: request.body.name,
    number: request.body.number
  })
  newPerson.save()
    .then(result => { 
      console.log("add new person: ", result);
      response.json(result)
    })
    .catch(error => {
      next(error)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findById(id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {
      next(error)
    })
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = String(request.params.id)
  Person.findByIdAndDelete(id)
    .then(result => { 
      response.status(204).send({
        message: "Successfully deleted"
      })
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  const updatePerson = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, updatePerson, { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
