require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const Person = require('./models/person')
//const { request, response } = require('express')

const app = express()
  .use(express.json())
  .use(morgan('tiny'))
  .use(cors())
  .use(express.static('build'))

morgan.token('data', (request, response) => response.body)

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
];

//#region Endpoints

// INFO PAGE
app.get("/info", (request, response) => {
  response.send(`
    <p>Phonebook has info for ${persons.length} people.</p>
    <p>${Date()}</p>`)
})

// GET ALL CONTACTS
app.get("/api/persons", (request, response) => {  
  Person.find({}).then((persons) => {
    response.json(persons)
  });
});

// GET ONE CONTACT
app.get("/api/persons/:id", (request, response) => {
  // const id = Number(request.params.id)
  // const person = persons.find(p => p.id === id)
  Person.findById(request.params.id)
    .then(person =>{
      person
      ? response.json(person)
      : response.status(404).end()
    })
    .catch(error => {
      console.log(error)
      response.status(400).send({error: 'malformatted id'})
    })
  
})

// ADD CONTACT
app.post('/api/persons', (request, response) => {
  const body = request.body

  //Error handling
  if (!body.name){
    return response.status(400).json({error: 'name missing'})
  }
  if (!body.number){
    return response.status(400).json({error: 'phone number missing'})
  }
  if(persons.some(p => p.name === body.name)){
    return response.status(400).json({error: 'name must be unique'})
  }

  //DB save
  const person = new Person({
    name: body.name,
    number: body.number,
  })  
  person.save().then(savedPerson => response.json(savedPerson))
})

// DELETE CONTACT
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(p => p.id !== id)
  response.status(204).end()
})

//#endregion 

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
