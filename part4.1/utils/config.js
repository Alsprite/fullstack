const dotenv =  require('dotenv')
dotenv.config({ path: './config.env' })

let PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI

module.exports = {
  MONGODB_URI,
  PORT
}