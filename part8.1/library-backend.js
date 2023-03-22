const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v4: uuidv4 } = require('uuid')

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
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

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
  you can remove the placeholder query once your first own has been implemented 
*/

const typeDefs = `
type Author {
  name: String!
  born: Int
  bookCount: Int!
}
type Book {
  title: String!
  author: Author!
  published: Int!
  genres: [String!]!
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
  allBooks: [Book!]!
  allAuthors: [Author!]!
  Mutation: [Book!]!
}
`

const resolvers = {
  Query: {
    booksCount: () => books.length,
    authorCount: () => authors.length,
    // allBooks: (author = 'Robert Martin') => {
    //   const authorName = author
    //   const filteredBooks = books.filter(book => book.author === authorName)
    //   return filteredBooks
    // },
    allBooks: (genre = "refactoring") => {
      const filteredBooks = books.filter(book => book.genres.includes(genre))
      return filteredBooks
    },
    allAuthors: () => {
      const authorsWithBooks = authors.map(author => ({
        name: author.name,
        born: author.born,
        bookCount: books.filter(book => book.author === author.name).length
      }))

      return authorsWithBooks
    }
  },
  Book: {
    author: (root) => {
      return authors.find(a => a.name === root.author)
    }
  },
  Mutation: {
    addBook: (parent, args) => {
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
      editAuthor: (root, args) => {
      const rightAuthor = authors.find(a => a.author === args.author)
      if (!rightAuthor) {
        return null
      }
      const updatedAuthor = {...rightAuthor, born: args.born}
      authors.map(a => a.author === args.author ? updatedAuthor : a)
      return updatedAuthor
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