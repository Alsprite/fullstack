/* eslint-disable no-undef */
describe('Blog app', function() {
  beforeEach(function() {
    // cy.request('POST', 'http://localhost:3003/api/testing/reset')
    // const user = {
    //   name: 'root',
    //   username: 'Superuser',
    //   password: 'salainen'
    // }
    // cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#nameid').type('root')
      cy.get('#passid').type('salainen')
      cy.get('#login-btn').click()
      cy.contains('blogs')
    })

    it('fails with wrong credentials', function() {
      cy.get('#nameid').type('root')
      cy.get('#passid').type('lmao')
      cy.get('#login-btn').click()
      cy.contains('invalid username or password')
    })
  })
  describe('when logged in', function() {
    beforeEach(function() {
      cy.get('#nameid').type('root')
      cy.get('#passid').type('salainen')
      cy.get('#login-btn').click()
    })

    it('a new blog can be created', function() {
      cy.contains('New blog').click()
      cy.get('#title').type('a note created')
      cy.get('#author').type('cypress gaming')
      cy.get('#url').type('cypress.com')
      cy.get('button').contains('Create').click()
      cy.contains('a note created by cypress gaming')
    })
    it('blog can be liked', function() {
      cy.contains('New blog').click()
      cy.get('#title').type('a note created')
      cy.get('#author').type('cypress gaming')
      cy.get('#url').type('cypress.com')
      cy.get('button').contains('Create').click()
      cy.contains('a note created by cypress gaming')

      cy.contains('a note created by cypress gaming')
      cy.get('button').contains('show').click()
      cy.contains('0')
      cy.get('button').contains('Like').click()
      cy.reload()
      cy.contains('show').click()
      cy.contains('1')
    })
    it('A blog can be deleted by its creator', () => {
      cy.contains('New blog').click()
      cy.get('#title').type('Test title')
      cy.get('#author').type('Test author')
      cy.get('#url').type('cypress.com')
      cy.get('button').contains('Create').click()
      cy.reload()
      cy.wait(500)
      cy.contains('Test title')
      cy.contains('show').click()
      cy.contains('Delete').click()
      cy.reload()
    })
    it('Delete button is shown only to the creator', () => {
      cy.contains('New blog').click()
      cy.get('#title').type('Test title')
      cy.get('#author').type('Test author')
      cy.get('#url').type('cypress.com')
      cy.get('button').contains('Create').click()
      cy.reload()
      cy.wait(500)

      cy.get('button').contains('Log out').click()
      cy.get('#nameid').type('matti')
      cy.get('#passid').type('1234')
      cy.get('#login-btn').click()

      cy.get('button').contains('show').click()
      cy.get('button').contains('Delete').should('not.exist')
    })
    it('Blogs are sorted by likes', () => {
      cy.contains('New blog').click()
      cy.get('#title').type('note1')
      cy.get('#author').type('cypress gaming')
      cy.get('#url').type('cypress.com')
      cy.get('button').contains('Create').click()

      cy.contains('note1 by cypress gaming')
      cy.contains('show').click()
      cy.contains('0')
      cy.get('button').contains('Like').click()

      cy.reload()

      cy.contains('New blog').click()
      cy.get('#title').type('note2')
      cy.get('#author').type('cypress gaming')
      cy.get('#url').type('cypress.com')
      cy.get('button').contains('Create').click()

      cy.get('#note2').parent().find('button').contains('show').click()
      cy.contains('0')
      cy.get('button').contains('Like').click()
      cy.reload()
      cy.get('#note2').parent().find('button').contains('show').click()
      cy.get('button').contains('Like').click()
      cy.reload()
      cy.get('#note2').parent().find('button').contains('show').click()
    })
  })
})