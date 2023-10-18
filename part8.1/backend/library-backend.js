const { ApolloServer } = require('@apollo/server')
const config = require('./config')
const { expressMiddleware } = require('@apollo/server/express4')
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const express = require('express')
const cors = require('cors')
const http = require('http')

const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const User = require('./models/user')
const typeDefs = require('./schemas')
const resolvers = require('./resolvers')

const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/lib/use/ws')

mongoose.set('strictQuery', false)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
})

  const start = async () => {
    const app = express()
    const httpServer = http.createServer(app)
    const wsServer = new WebSocketServer({
      server: httpServer,
      path: '/',
    })

    const schema = makeExecutableSchema({ typeDefs, resolvers })
    const serverCleanup = useServer({ schema }, wsServer)

    const server = new ApolloServer({
      schema,
      plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
        {
          async serverWillStart() {
            return {
              async drainServer() {
                await serverCleanup.dispose()
              },
            }
          },
        },
      ],
    })
    await server.start()
    app.use(
      '/',
      cors(),
      express.json(),
      expressMiddleware(server, {
        context: async ({ req }) => {
          const auth = req ? req.headers.authorization : null
          if (auth && auth.startsWith('Bearer ')) {
            const decodedToken = jwt.verify(auth.substring(7), config.JWT_SECRET)
            const currentUser = await User.findById(decodedToken.id).populate(
              'favoriteGenre'
            )
            return { currentUser }
          }
        },
      }),
    )
    const PORT = 4000
    httpServer.listen(PORT, () =>
      console.log(`Server is now running on http://localhost:${PORT}`)
    )
  }
  start()