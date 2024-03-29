require('dotenv').config()

let PORT = process.env.PORT || 3004
let MONGODB_URI = process.env.MONGODB_URI
let JWT_SECRET = 'secret'

module.exports = {
    MONGODB_URI,
    PORT,
    JWT_SECRET
}