const mongoose = require('mongoose')
require('dotenv').config()

// const password = process.env.MONGO_PASSWORD
// const collection = 'phonebook'
// const url = `mongodb+srv://fullstack:${password}@fullstack.geubm39.mongodb.net/${collection}?retryWrites=true&w=majority`

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)
mongoose
  .connect(url)
  .then(() => console.log('connected to MongoDB'))
  .catch((error) => console.log('error connecting to MongoDB:', error.message))

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    validate: {
      validator: function(v) {
        return /\d{3}-\d{3}-\d{4}/.test(v)
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: [true, 'User phone number required']
  }
})

personSchema.set('toJSON', {
  transform: (document, returned) => {
    returned.id = returned._id.toString()
    delete returned._id
    delete returned.__v
  }
})

const Person = mongoose.model('Person', personSchema)

module.exports = Person