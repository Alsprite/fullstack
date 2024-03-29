const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        _id: "63c7a957dbd6014510289020",
        title: "Meika",
        author: "Poika",
        url: "youtube",
        likes: 2,
        _v: 0
    },
    {
        _id: "63c7a957dbd6014510289022",
        title: "testi title",
        author: "testi author",
        url: "esedu.fi",
        _v: 0
    }
  ]
  const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
  }
const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, blogsInDb, usersInDb
}