const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const { request, response } = require('express')

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

const generateId = () => {
  return Math.floor((Math.random() * 1000000))
}

//#region Endpoints

// app.get("/", (request, response) => {
//   response.send("<h1>Welcome!<h1>");
// });

app.get("/info", (request, response) => {
  response.send(`
    <p>Phonebook has info for ${persons.length} people.</p>
    <p>${Date()}</p>`)
})

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(p => p.id === id)
  person
    ? response.json(person)
    : response.status(404).end()
})

app.post('/api/persons', (request, response) => {
  //Error handling
  const body = request.body
  console.log(body);
  if (!body.name){
    return response.status(400).json({error: 'name missing'})
  }
  if (!body.number){
    return response.status(400).json({error: 'phone number missing'})
  }
  if(persons.some(p => p.name === body.name)){
    return response.status(400).json({error: 'name must be unique'})
  }

  //Implementation
  const person = {
    name: body.name,
    number: body.number,
    id: generateId()
  }
  persons = persons.concat(person)
  response.json(person)
})

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
