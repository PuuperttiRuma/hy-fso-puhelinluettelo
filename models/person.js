const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

// const db = "phonebook";
// const url = `mongodb+srv://fullstack:${password}@cluster0.iqm6y.mongodb.net/${db}?retryWrites=true&w=majority`;

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
}).then(result => {
  console.log('connected to MongoDB')
}).catch((error => {
  console.log('error connecting to MongoDB:', error.message)
}))

const personSchema = new mongoose.Schema({
  name: { 
    type: String,
    required: [true, 'Name field is missing'],
    unique: [true, 'Name already exists in the database'],
    minlength: [3, 'Name must be at least 3 characters long']
  },
  number: { type: String, minlength: [8, 'Number must be at least 8 digits long'] },
});

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id.toString()
    delete returnObject._id
    delete returnObject.__v
  }
})

module.exports = mongoose.model("Person", personSchema);