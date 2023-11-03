const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)

mongoose
  .connect(url)
  .then(() => {
    console.log('connected to MongoDB info')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB info:', error.message)
  })

const infoSchema = new mongoose.Schema({
  type: String,
  message: String
})

const Info = mongoose.model('Info', infoSchema)

module.exports = Info