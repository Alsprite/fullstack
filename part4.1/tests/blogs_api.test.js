const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)

const initialBlogs = [
    {
        title: "Meika",
        author: "Poika",
        url: "youtube",
        likes: 2,
        id: "63c0fe0c8007d0d537168fc3"
    },
    {
        title: "Meika",
        author: "Poika",
        url: "youtube",
        likes: 2,
        id: "63c0fe0c8007d0d537168fc3"
    },
    {
        title: "Meika",
        author: "Poika",
        url: "youtube",
        likes: 2,
        id: "63c0fe0c8007d0d537168fc3"
    }
  ]
  
  beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
  })

test('notes are returned as json', async () => {
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})
test('POST /api/blogs works', async () => {
    const blogsBefore = await Blog.find({})
  
    const newPost = {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0
    }
  
    await api
      .post('/api/blogs')
      .send(newPost)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const blogsAfter = await Blog.find({})
  
    expect(blogsAfter.length).toBe(blogsBefore.length + 1)
  
    const titles = blogsAfter.map(n => n.title)
    expect(titles).toContain('Canonical string reduction')
  })

afterAll(() => {
  mongoose.connection.close()
})