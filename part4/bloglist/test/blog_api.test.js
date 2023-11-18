/* eslint-disable no-unused-vars */
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const api = supertest(app)

const initialData = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2
  }  
  ]

var theToken = null

beforeEach(async () => {
  
  await Blog.deleteMany({})
  await User.deleteMany({})
  // Crreate user of "Tri" for testing
  await api
    .post('/api/users')
    .send({ "username": "tri", "name": "Tri", "password": "1234567" })
    .then(response => {
      console.log("response after create user TRI: ", response.body)
      console.log("Success create root user of TRI")
    })
    .catch(error => {
      console.log("Error create root user of TRI: ", error)
    })

  // Login and set token
  await api
    .post('/api/login')
    .send({ "username": "tri", "password": "1234567" })
    .then(response => {
      theToken = response._body.token
      console.log("success set token of TRI")
    })
    .catch(error => {
      console.log("Error set token of TRI: ", error)
    })
  
  // Post initial data blog
  //   await initialData.forEach( async (blogData) => {
  //   await api
  //     .post('/api/blogs')
  //     .set({ "authorization": `Bearer ${theToken}`})
  //     .send(blogData)
  // });
  const promises = initialData.map(async (blogData) => {
  await api
    .post('/api/blogs')
    .set({ "authorization": `Bearer ${theToken}` })
    .send(blogData);
});

await Promise.all(promises);

}, 15000)



describe('Blog API: GET Blog Data', () => {
  test('blogs are returned as json', async () => { 
    await api
      .get('/api/blogs')
      .set({ "authorization": `Bearer ${theToken}`})
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('initial blog lengths is 6', async () => {
    const response =
      await api
        .get('/api/blogs')
        .set({ "authorization": `Bearer ${theToken}`})

    expect(response.body).toHaveLength(6)
  })

  test('unique identifier property of the blog posts is named id', async () => {
    const response =
      await api
        .get('/api/blogs')
        .set({ "authorization": `Bearer ${theToken}`})
    
    response.body.forEach(element => {
      expect(element.id).toBeDefined()
    });
  })
})

describe('Blog API: POST Blog Data', () => {
  test('a valid blog can be added', async () => {
  const newBlog = {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2
  }

  const response = await api
    .post('/api/blogs')
    .set({ "authorization": `Bearer ${theToken}`})
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  
  const blogData = await Blog.find({})
  
  expect(blogData.length).toBe(initialData.length + 1)
})

  test('likes property defaults to zero if not provided', async () => {
    const newBlog = {
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html"
    }

    const response = await api
      .post('/api/blogs')
      .set({ "authorization": `Bearer ${theToken}`})
      .send(newBlog)
      .expect(200)
    
    // console.log(response._body)
    expect(response._body.likes).toBe(0)
  })

  test('validation for missing title or url', async () => {
    const newBlog = {
      author: "Robert C. Martin",
      likes: 2
    }

    const response = await api
      .post('/api/blogs')
      .set({ "authorization": `Bearer ${theToken}`})
      .send(newBlog)
      .expect(400)
    
    expect(response.body.error).toBe('title or url missing')

  })
})

describe('Blog API: DELETE Blog Data', () => { 
  test('deletion of a blog', async () => {
    const blogsAtStart = await api
      .get('/api/blogs')
      .set({ "authorization": `Bearer ${theToken}`})
  const blogsToDelete = await blogsAtStart._body[0]

  console.log("blogsToDelete: ", blogsToDelete)
    
  await api
    .delete(`/api/blogs/${blogsToDelete.id}`)
    .set({ "authorization": `Bearer ${theToken}`})
    .expect(204)
  
    const blogsAtEnd = await api
      .get('/api/blogs')
      .set({ "authorization": `Bearer ${theToken}`})

    console.log("blogsAtEnd: ", blogsAtEnd._body)
    console.log("blogsAtStart: ", blogsAtStart._body)
    
  expect(blogsAtEnd._body.length).toBe(
    blogsAtStart._body.length - 1
  )
}, 15000)
})

describe('Blog API: PUT Blog Data', () => {
test('update of a blog', async () => {
  const blogsAtStart = await api.get('/api/blogs')
  const blogToUpdate = blogsAtStart.body[0]
  blogToUpdate.likes = blogToUpdate.likes + 1

  const response = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .set({ "authorization": `Bearer ${theToken}`})
    .send(blogToUpdate)
    .expect(200)
  
  expect(response.body.likes).toBe(blogToUpdate.likes)
})
  
})

afterAll( async () => {
  await mongoose.connection.close()
})