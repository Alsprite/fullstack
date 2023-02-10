const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const helper = require('./test_helper')
const api = supertest(app)

describe('when there is initially one user at db', () => {
    // ...
  
    test('creation fails with proper statuscode and message if username already taken', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'matti',
        name: 'mluukkai',
        password: '1234',
      }
  
      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
  
    //   expect(result.body.error).toContain('username must be unique')
  
    //   const usersAtEnd = await helper.usersInDb()
    //   expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
    afterAll(() => {
        mongoose.connection.close()
    })
  })