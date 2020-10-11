const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Give password as an argument.');
  process.exit(1)
}

const password = process.argv[2]
const db = 'phonebook'
const name = process.argv[3]
const number = process.argv[4]

const url = 
  `mongodb+srv://fullstack:${password}@cluster0.iqm6y.mongodb.net/${db}?retryWrites=true&w=majority`

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: name,
  number: number,
})

person.save().then(result => {
  console.log(result);
  console.log('Person saved.');
  mongoose.connection.close()
})