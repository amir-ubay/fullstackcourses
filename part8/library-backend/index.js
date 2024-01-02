const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLError } = require("graphql");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

console.log("connecting to ", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

let authors = [
  {
    name: "Robert Martin",
    // id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: "Martin Fowler",
    // id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963,
  },
  {
    name: "Fyodor Dostoevsky",
    // id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821,
  },
  {
    name: "Joshua Kerievsky", // birthyear not known
    // id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
    born: null,
  },
  {
    name: "Sandi Metz", // birthyear not known
    // id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
    born: null,
  },
];

let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    genres: ["classic", "crime"],
  },
  {
    title: "The Demon ",
    published: 1872,
    author: "Fyodor Dostoevsky",
    genres: ["classic", "revolution"],
  },
];

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
  type User {
    username: String!,
    id: ID!,
    favoriteGenre: [String!]!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount : Int!,
    authorCount : Int!,
    allBooks(author: String, genre: String) : [Books],
    allAuthors : [Authors],
    me: User
  }

  type Mutation {
    addBook(
      title: String!,
      published: Int,
      author: String!,
      genres: [String],
    ): [Books],
    editAuthor(name: String!, setBornTo: Int): Authors,
    bookCollection : [Books],
    authorList : [Authors],
    clearBooks : Int,
    createUser(
      username: String!,
      password: String!,
      favoriteGenre: [String]
    ) : User,
    login(
      username: String!,
      password: String!
    ) : Token
  }
`;

const validateInput = (input) => {
  if (input.length < 3) {
    throw new GraphQLError(
      "Author name or Book title must be at least 3 characters long",
      {
        extensions: {
          code: "BAD_USER_INPUT",
          invalidsArgs: input,
        },
      }
    );
  }
};

const resolvers = {
  Query: {
    bookCount: async () => {
      return Book.find({}).then((data) => data.length);
    },
    authorCount: async () => {
      return Author.find({}).then((data) => data.length);
    },
    allBooks: async (root, args) => {
      if (args.author) {
        validateInput(args.author);
      }
      var filter = {};
      const author = await Author.findOne({ name: args.author });
      if (args.author && !args.genre && author) {
        filter = { author };
      } else if (args.genre && !args.author) {
        filter = { genres: args.genre };
      } else if (args.author && args.genre) {
        filter = { "author.name": args.author, genres: args.genre };
      }

      const rawData = await Book.find(filter).then((data) => data);
      const data = await Promise.all(
        rawData.map(async (book) => {
          const authorData = await Author.findOne({ _id: book.author });
          const authorCount = await Book.find({ author: book.author }).then(
            (data) => data.length
          );
          return {
            ...book._doc,
            author: { ...authorData._doc, bookCount: authorCount },
          };
        })
      );

      return data;
    },
    allAuthors: async () => {
      const rawData = await Author.find({}).then((data) => data);
      const result = await Promise.all(
        rawData.map(async (author) => {
          const bookCount = await Book.find({ author: author._id }).then(
            (data) => data.length
          );
          return { ...author._doc, bookCount };
        })
      );
      return result;
    },
    me: async (root, args, context) => {
      return context.currentUser;
    },
  },
  Mutation: {
    // Library Mutation
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "UNAUTHENTICATED",
            http: {
              status: 401,
            },
          },
        });
      }
      validateInput(args.title);
      validateInput(args.author);
      try {
        const checkAuthor = await Author.findOne({ name: args.author });

        if (!checkAuthor) {
          const newAuthor = new Author({
            name: args.author,
            born: null,
          });

          const savedAuthor = await newAuthor.save();
          console.log(
            "Success saved new author during add new book: ",
            savedAuthor
          );

          const book = new Book({
            title: args.title,
            published: args.published,
            genres: args.genres,
            author: savedAuthor._id,
          });

          const savedBook = await book.save();
          console.log("Success saved new book with a new author: ", savedBook);

          return Book.find({}).populate("author");
        } else {
          const book = new Book({
            title: args.title,
            published: args.published,
            genres: args.genres,
            author: checkAuthor._id,
          });

          const savedBook = await book.save();
          console.log("Success saved new book: ", savedBook);

          return Book.find({}).populate("author");
        }
      } catch (error) {
        console.log(error);
        throw new Error("Failed to add book");
      }
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "UNAUTHENTICATED",
            http: {
              status: 401,
            },
          },
        });
      }
      validateInput(args.name);
      try {
        const author = await Author.findOne({ name: args.name });
        const bookCount = await Book.find({ author: author._id }).then(
          (data) => data.length
        );
        if (!author) {
          throw new GraphQLError("Author not found");
        }

        const result = await Author.findByIdAndUpdate(
          author._id,
          {
            born: args.setBornTo,
          },
          {
            new: true,
          }
        );

        console.log({ ...result._doc, bookCount });
        return { ...result._doc, bookCount };
      } catch (error) {
        console.log(error);
        throw new Error("Failed to edit author");
      }
    },
    // User Mutation
    createUser: async (roor, args) => {
      const user = new User({
        username: args.username,
        password: args.password,
        favoriteGenre: args.favoriteGenre,
      });

      try {
        const savedUser = await user.save();
        return savedUser;
      } catch (error) {
        throw new GraphQLError("Creating the user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidsArgs: args.username,
            error,
          },
        });
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({
        username: args.username,
        password: args.password,
      });

      if (!user) {
        throw new GraphQLError("Wrong Crednetials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
    // Setup Data Mutation
    bookCollection: async (root, args) => {
      const reMap = await Promise.all(
        books.map(async (book) => {
          return {
            ...book,
            author: await Author.find({ name: book.author }).then(
              (data) => data[0].id
            ),
          };
        })
      );

      console.log(reMap);

      return Book.insertMany(reMap);
    },
    authorList: async (root, args) => {
      return Author.insertMany(authors);
    },
    clearBooks: async (root, args) => {
      await Book.deleteMany({});
      return Book.find({}).then((data) => data.length);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.startsWith("Bearer ")) {
      const decodedToken = jwt.verify(
        auth.substring(7),
        process.env.JWT_SECRET
      );
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
