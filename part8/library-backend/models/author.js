const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const schema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true,
    minlength: 4
  },
  born: {
    type: Number
  }
})

schema.plugin(uniqueValidator)

module.exports = mongoose.model('Author', schema)