const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Author = require('./models/Author')
const Book = require('./models/book')

require('dotenv').config()
const { MONGODB_URI } = require('./config')

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
  author: Author!
  published: Int!
  genres: [String!]!
  id: String!
}
type Mutation {
  addBook(
    title: String!
    author: String!
    published: Int!
    genres: [String!]!
  ): Book
  editAuthor(
    name: String!
    born: Int!
  ): Author!
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
      let books = await Book.find().populate('author')
      // console.log(books[0])
      if (args.author) {
        console.log(args.author)
        console.log(books[0].Author)
        books = books.filter(book => book.author === args.author)
      }
      if (args.genre) {
        books = books.find({ genres: args.genre })
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
    author: (root) => {
      // console.log(root)
      return root
    }
  },
  // Mutation: {
  //   addBook: (parent, args) => {
  //     const { title, author, published, genres} = args
  //     const authorExists = authors.find(a => a.name === author)
    
  //     if (!authorExists) {
  //       const newAuthor = { name: author, id: uuidv4() }
  //       authors = authors.concat(newAuthor)
  //     }

  //     const newBook = {...args, id: uuidv4()}
  //     books = books.concat(newBook)
  //     return newBook
  //     },
  //     editAuthor: (parent, args) => {
  //       const { name, born } = args;
  //       const author = authors.find(author => author.name === name);
  //       if (!author) {
  //         return null;
  //       }
  //       const updatedAuthor = { ...author, born };
  //       authors = authors.map(a => a.id === author.id ? updatedAuthor : a);
  //       return updatedAuthor;
  //     }
  //   }
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