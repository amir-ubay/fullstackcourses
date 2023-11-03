const mongoose = require('mongoose')

const password = process.argv[2]
const collection = 'phonebook'

const url = `mongodb+srv://fullstack:${password}@fullstack.geubm39.mongodb.net/${collection}?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  Person
    .find({})
    .then(result => {
      result.forEach(person => {
        console.log(person)
      })
      mongoose.connection.close()
    })
} else {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })

  person.save().then(result => {
    console.log(`added ${person.name} number ${person.number} to phonebook`)
    console.log('result: ', result)
    mongoose.connection.close()
  })
}

