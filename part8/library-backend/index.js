const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Book = require('./models/book')
const Author = require('./models/author')

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to ', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

let authors = [
  {
    name: 'Robert Martin',
    // id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    // id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    // id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    // id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
    born: null
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    // id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
    born: null
  },
]

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    genres: ['classic', 'revolution']
  },
]


const typeDefs = `
  scalar ID

  type Authors {
    name: String!,
    id: ID,
    bookCount: Int,
    born: Int
  }

  type Books {
    title: String!,
    published: Int,
    author: Authors,
    genres: [String],
  }

  type Query {
    bookCount : Int!,
    authorCount : Int!,
    allBooks(author: String, genre: String) : [Books],
    allAuthors : [Authors],
  }

  type Mutation {
    addBook(
      title: String!,
      published: Int,
      author: String!,
      genres: [String],
    ): [Books],
    editAuthor(name: String!, setBornTo: Int): [Authors],
    bookCollection : [Books],
    authorList : [Authors],
    clearBooks : Int,
  }
`

const resolvers = {
  Query: {
    bookCount : async () => {
      return Book.find({}).then(data => data.length)
    },
    authorCount : async () => {
      return Author.find({}).then(data => data.length)
    },
    allBooks: async (root, args) => {
      var filter = {}
      const author = await Author.findOne({ name: args.author })
      if (args.author && !args.genre && author) {
        filter = { author }
      } else if (args.genre && !args.author) {
        filter = { genres: args.genre }
      } else if (args.author && args.genre) {
        filter = { 'author.name': args.author, genres: args.genre }
      }

      console.log("filter: ", filter)
      
      const rawData = await Book.find(filter).then(data => data)
      const data = await Promise.all(rawData.map(async book => {
        const authorData = await Author.findOne({ _id: book.author })
        const authorCount = await Book.find({ author: book.author}).then(data => data.length)
        return {...book._doc, author: {...authorData._doc, bookCount: authorCount} }
      }))

      return data
      
      // return Book.find({})
      // if (args.author && !args.genre) {
      //   const data = books.filter(book => book.author === args.author)
      //   return data
      // } else if (args.genre && !args.author) {
      //   const data = books.filter(book => book.genres.includes(args.genre))
      //   return data
      // } else if (args.author && args.genre) {
      //   const data = books.filter(book => book.author === args.author && book.genres.includes(args.genre))
      //   return data
      // } else if (args.author === undefined || args.genre === undefined) {
      //   return books
      // }
    },
    allAuthors: async () => {

      return Author.find({})
      // const data = authors.map(author => {
      //   const bookCount = books.filter(book => book.author === author.name).length
      //   return {
      //     name: author.name,
      //     id: author.id,
      //     bookCount: bookCount,
      //     born: author.born ? author.born : 0
      //   }
      // })
      // return data
    }
  },
  Mutation: {
    addBook: (root, args) => {
      const book = new Book({
        title: args.title,
        published: args.published,
        genres: args.genres
      })

      book.save()
        .then(savedBook => {
          console.log("Saved book: ", savedBook)
        })
        .catch(error => {
          console.log(error)
        })

      // const isOldAuthor = authors.some(author => author.name === args.autor)

      // if (!isOldAuthor) {
      //   const newAuthor = {
      //     name: args.author,
      //     id: "1231aqeqeq",
      //     born: null
      //   }
      //   authors = authors.concat(newAuthor)
      // }
      // console.log(books)
      // console.log("-----------------");
      // console.log(authors)
      // return books
    },
    editAuthor: (root, args) => {
      // const toEdit = authors.find(author => author.name.toLowerCase() === args.name.toLowerCase())
      // if (toEdit) {
      //   toEdit.born = args.setBornTo
      //   console.log(authors)
      //   return authors
      // } else {
      //   throw new GraphQLError('Author not found')
      // }
    },
    bookCollection: async (root, args) => {
      const reMap = await Promise.all(books.map( async (book) => {
        return {
          ...book,
          author: await Author.find({ name: book.author }).then(data => data[0].id)
        }
      }))

      console.log(reMap)

      return Book.insertMany(reMap)
    },
    authorList: async (root, args) => {
      return Author.insertMany(authors)
    },
    clearBooks: async (root, args) => {
      await Book.deleteMany({})
      return Book.find({}).then(data => data.length)
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})