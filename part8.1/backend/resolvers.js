const jwt = require('jsonwebtoken')
const { GraphQLError } = require('graphql')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const { PubSub } = require('graphql-subscriptions')
const config = require('./config')
const pubsub = new PubSub()

const resolvers = {
    Query: {
      me: (root, args, context) => {
        return context.currentUser
      },
      bookCount: async () => Book.collection.countDocuments(),
      authorCount: () => Author.collection.countDocuments(),
      allBooks: async (root, args) => {
        let query = {}
        if (args.author) {
          const author = await Author.findOne({ name: args.author });
      
          if (author) {
            query.author = author._id;
          } else {
            return [];
          }
        }
  
        if (args.genre) {
          query.genres = args.genre
        }
  
        const books = await Book.find(query).populate('author')
        return books
      },
      allAuthors: async () => {
        const authors = await Author.find()
        return authors
      },
    },
    Mutation: {
      addBook: async (root, args, context) => {
        try {
          const currentUser = context.currentUser
          if (!currentUser) {
            throw new GraphQLError('not authenticated', {
              extensions: {
                code: 'BAD_USER_INPUT',
              }
            })
          }
          let author = await Author.findOne({ name: args.author })
  
          if (!author) {
            author = new Author({
            name: args.author
          })
            await author.save()
          }
          const newBook = new Book ({
            title: args.title,
            author: author._id,
            published: args.published,
            genres: args.genres,
          })

          const bookAdded = {
            title: newBook.title,
            published: newBook.published,
            author: {
              name: author.name, // Ensure that the author's name is not null
            },
            genres: newBook.genres,
            id: newBook._id,
          }
  
          await newBook.save()
          pubsub.publish('BOOK_ADDED', { bookAdded })
          return bookAdded
        } catch(error) {
          throw new GraphQLError('Creating book failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        }
        
      },
      newAuthor: async (root, args, context) => {
        try {
          const currentUser = context.currentUser
  
          if (!currentUser) {
            throw new GraphQLError('not authenticated', {
              extensions: {
                code: 'BAD_USER_INPUT',
              }
            })
          }
          let authorExists = await Author.findOne({ name: args.author })
          if (authorExists) {
            throw new Error("Author already exists")
          }
          
          const newAuthor = new Author({
            name: args.name
          })
  
          await newAuthor.save()
          return newAuthor
        } catch(error) {
          throw new GraphQLError('Creating author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        }
      },
      editAuthor: async (root, args, context) => {
        try {
          const currentUser = context.currentUser
  
          if (!currentUser) {
            throw new GraphQLError('not authenticated', {
              extensions: {
                code: 'BAD_USER_INPUT',
              }
            })
          }
          const author = await Author.findOne({ name: args.name })
  
          author.born = args.born;
                
          const updatedAuthor = await author.save();
  
          return updatedAuthor;
        } catch(error) {
          throw new GraphQLError('Editing author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        }
      },
      createUser: async (root, args) => {
        const user = new User({
          username: args.username,
          favoriteGenre: args.favoriteGenre
        })
  
      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        })
      },
      login: async (root, args) => {
        const user = await User.findOne({ username: args.username })
    
        if ( !user || args.password !== 'secret' ) {
          throw new GraphQLError('wrong credentials', {
            extensions: {
              code: 'BAD_USER_INPUT'
            }
          })        
        }
    
        const userForToken = {
          username: user.username,
          id: user._id,
        }
        return { value: jwt.sign(userForToken, config.JWT_SECRET) }
      },
    },
    Book: {
      title: (root) => root.title,
      published: (root) => root.published,
      author: async (root) => root.author,
      id: (root) => root.id,
      genres: (root) => root.genres
    },
    Author: {
      bookCount: async (root) => {
        const authorName = root.name
  
        const author = await Author.findOne({ name: authorName });
  
        const bookCount = await Book.countDocuments({ author: author._id })
        return bookCount
      },
      born: (root) => {
        return root.born !== undefined ? root.born : null
      }
    },
    Subscription: {
        bookAdded: {
          subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
        },
      },
  }

module.exports = resolvers