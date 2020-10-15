require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()
  .use(express.static('build'))
  .use(express.json())
  .use(morgan('tiny'))
  .use(cors())

morgan.token('data', (_request, response) => response.body)

//#region Endpoints

// INFO PAGE
app.get('/info', (_request, response) => {
  Person.estimatedDocumentCount()
    .then(count => {
      response.send(`
    <p>Phonebook has info for ${count} people.</p>
    <p>${Date()}</p>`)
    })
})

// GET ALL CONTACTS
app.get('/api/persons', (_request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons)
  })
})

// GET ONE CONTACT
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      person ? response.json(person) : response.status(404).end()
    })
    .catch((error) => next(error))
})

// ADD CONTACT
app.post('/api/persons', (request, response, next) => {
  const body = request.body

  //Validating
  // if (!body.name) {
  //   return response.status(400).json({ error: "name missing" });
  // }
  // if (!body.number) {
  //   return response.status(400).json({ error: "phone number missing" });
  // }
  // if (persons.some((p) => p.name === body.name)) {
  //   return response.status(400).json({ error: "name must be unique" });
  // }

  //DB save
  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save()
    .then((savedPerson) => response.json(savedPerson))
    .catch(error => next(error))
})

// UPDATE NUMBER
app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new:true })
    .then(updatedPerson => response.json(updatedPerson))
    .catch(error => next(error))
})

// DELETE CONTACT
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(response.status(204).end())
    .catch(error => next(error))
})

//#endregion

//#region ERROR HANDLERS

const errorHandler = (error, _request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

//#endregion

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
