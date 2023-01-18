const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)
const helper = require('./test_helper')
  
  describe('when there is initially some blogs saved', () => {
    beforeEach(async () => {
      await Blog.deleteMany({})
      await Blog.insertMany(helper.initialBlogs)
    })


test('blogs are returned as json', async () => {
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
// test('POST /api/blogs new blogs has 0 likes if not specified', async () => {
//   const newPost = {
//     title: 'testi title',
//     author: 'testi author',
//     url: 'esedu.fi'
//   }

//   await api
//     .post('/api/blogs')
//     .send(newPost)
//     .expect(200)
//     .expect('Content-Type', /application\/json/)

//   const blog = await Blog.findById({ author: 'testi author' })

//   expect(blog.likes).toBe(0)
// })
describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const contents = blogsAtEnd.map(r => r.content)

    expect(contents).not.toContain(blogToDelete.content)
  })

afterAll(() => {
  mongoose.connection.close()
})
})
})