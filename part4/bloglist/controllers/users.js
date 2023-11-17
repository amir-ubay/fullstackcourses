const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', (request, reponse, next) => { 
  User
    .find({})
    .populate('blogs', {url: 1, title: 1, author: 1, like: 1 })
    .then(users => {
      reponse.json(users)
    })
    .catch(error => next(error))
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  
  // Check if username and password are provided and have at least 3 characters
  if (!username || !password || username.length < 3 || password.length < 3) {
    return response.status(400).json({ error: 'Username and password must be provided and have at least 3 characters' })
  }

  // Check if the username is unique
  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({ error: 'Username already exists' })
  }
  
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  
  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter