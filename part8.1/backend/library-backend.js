const { ApolloServer, gql } = require('@apollo/server')
const { mongoose } = require('mongoose')
mongoose.set('strictQuery', false)
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v4: uuidv4 } = require('uuid')
const Author = require('./models/author')
const Book = require('./models/book')

require('dotenv').config({ path: './config.env'})
const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const { data } = require('./data.js')

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
  editAuthor(name: String!, setBornTo: Int!): Author
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
    booksCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (parent, args) => {
      const book = await Book.find({}).populate('author')
      console.log(book)
      return book
    },
    allAuthors: async () => {
      const author = await Author.find({})
      return author
    }
  },
  Book: {
    author: (root) => {
      return Author.find(a => a.name === root.author)
    }
  },
  Mutation: {
    addBook: (parent, args) => {
      const { title, author, published, genres} = args
      const authorExists = Author.find(a => a.name === author)
    
      if (!authorExists) {
        const newAuthor = { name: author, id: uuidv4() }
        Author = Author.concat(newAuthor)
      }

      const newBook = {...args, id: uuidv4()}
      Book = Book.concat(newBook)
      return newBook
      },
      editAuthor: (parent, args) => {
        const { name, born } = args;
        const author = Author.find(author => author.name === name);
        if (!author) {
          return null;
        }
        const updatedAuthor = { ...author, born };
        Author = Author.map(a => a.id === author.id ? updatedAuthor : a);
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