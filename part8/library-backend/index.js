const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
    born: null
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
    born: null
  },
]

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 *
 * Spanish:
 * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
 * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conección con el libro
*/

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

/*
  you can remove the placeholder query once your first one has been implemented 
*/

const typeDefs = `
  type Authors {
    name: String!,
    id: ID!,
    bookCount: Int,
    born: Int
  }

  type Books {
    title: String!,
    published: Int,
    author: String!,
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
  }
`

const resolvers = {
  Query: {
    bookCount : () => {
      return books.length
    },
    authorCount : () => {
      return authors.length
    },
    allBooks : (root, args) => {
      
      if (args.author && !args.genre) {
        const data = books.filter(book => book.author === args.author)
        return data
      } else if (args.genre && !args.author) {
        const data = books.filter(book => book.genres.includes(args.genre))
        return data
      } else if (args.author && args.genre) {
        const data = books.filter(book => book.author === args.author && book.genres.includes(args.genre))
        return data
      } else if (args.author === undefined || args.genre === undefined) {
        return books
      }
    },
    allAuthors: () => {
      const data = authors.map(author => {
        const bookCount = books.filter(book => book.author === author.name).length
        return {
          name: author.name,
          id: author.id,
          bookCount: bookCount
        }
      })
      return data
    }
  },
  Mutation: {
    addBook: (root, args) => {
      const newBook = {
        title: args.title,
        published: args.published,
        author: args.author,
        genres: args.genres,
        id: "1231aqeqeq"
      }
      books = books.concat(newBook)
      console.log(books)

      const isOldAuthor = authors.some(author => author.name === args.autor)
      if (!isOldAuthor) {
        const newAuthor = {
          name: args.author,
          id: "1231aqeqeq",
          born: null
        }
        authors = authors.concat(newAuthor)
      }
      console.log(books)
      console.log("-----------------");
      console.log(authors)
      return books
    },
    editAuthor: (root, args) => {
      const toEdit = authors.find(author => author.name === args.name)
      if (toEdit) {
        toEdit.born = args.setBornTo
        console.log(authors)
        return authors
      } else {
        return null
      }
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