require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

// Import for module
const blogsRouter = require('./controllers/blogs')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

// Connect To Database
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch(error => {
    logger.error('error connecting to MongoDB:', error.message)
  })

// Pre-Middleware
app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

// Main APP Routing
app.use('/api/blogs', blogsRouter)

// Post-Middleware
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app