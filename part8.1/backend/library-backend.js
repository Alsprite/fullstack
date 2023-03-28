const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v4: uuidv4 } = require('uuid')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Author = require('./models/author')
const Book = require('./models/book')
const config = require('./config')

require('dotenv').config()
const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })


const typeDefs = `
type Author {
  name: String!
  born: Int
  bookCount: Int!
  id: String!
}
type Book {
  title: String!
  published: Int!
  author: Author!
  genres: [String!]!
  id: ID!
}
type Mutation {
  addBook(
    title: String!
    author: String!
    published: Int!
    genres: [String!]!
  ): Book!
  editAuthor(
    name: String!
    born: Int!
  ): Author
}
type Query {
  booksCount: Int!
  authorCount: Int!
  allBooks(author: String, genre: String): [Book!]!
  allAuthors: [Author!]!
}
`

const resolvers = {
  Query: {
    booksCount: async () => {
      const books = await Book.find()
      return books.length
    },
    authorCount: async () => {
      const authors = await Author.find()
      return authors.length
    },
    allBooks: async (root, args) => {
      let books = await Book.find()
      if (args.author) {
        return books.filter(book => book.author.name === args.author)
      }

      if (args.genre) {
        return books.filter(book => book.genres.includes(args.genre))
      }

      return books
    },
    allAuthors: async () => {
      let books = await Book.find()
      let authors = await Author.find()
      const authorsWithBooks = authors.map(author => ({
        name: author.name,
        born: author.born,
        id: author.id,
        bookCount: books.filter(book => book.author === author.name).length
      }))

      return authorsWithBooks
    }
  },
  Book: {
    author: async (root) => {
      let author = await Author.findOne({ name: root.author })
      console.log(author, "ja", root.author)
      return author
    }
  },
  Mutation: {
    addBook: async (parent, args) => {
      let books = await Book.find()
      let authors = await Author.find()
      const { title, author, published, genres} = args
      const authorExists = authors.find(a => a.name === author)
      if (!authorExists) {
        const newAuthor = { name: author, id: uuidv4() }
        authors = authors.concat(newAuthor)
      }

      const newBook = {...args, id: uuidv4()}
      books = books.concat(newBook)
      return newBook
      },
      editAuthor: async (parent, args) => {
        let authors = await Author.find()
        const { name, born } = args;
        const author = authors.find(author => author.name === name);
        if (!author) {
          return null;
        }
        const updatedAuthor = { ...author, born };
        authors = authors.map(a => a.id === author.id ? updatedAuthor : a);
        return updatedAuthor;
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