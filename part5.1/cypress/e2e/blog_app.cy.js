/* eslint-disable no-undef */
describe('Blog app', function() {
  beforeEach(function() {
    // cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: "root",
      username: "Superuser",
      password: "salainen"
    }
    // cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  // describe('Login',function() {
  //   it('succeeds with correct credentials', function() {
  //     cy.get('#nameid').type('root')
  //     cy.get('#passid').type('salainen')
  //     cy.get('#login-btn').click()
  //     cy.contains('blogs')
  //   })

  //   it('fails with wrong credentials', function() {
  //     cy.get('#nameid').type('root')
  //     cy.get('#passid').type('lmao')
  //     cy.get('#login-btn').click()
  //     cy.contains('invalid username or password')
  //   })
  // })
  describe('when logged in', function() {
    beforeEach(function() {
      cy.get('#nameid').type('root')
      cy.get('#passid').type('salainen')
      cy.get('#login-btn').click()
    })

    // it('a new blog can be created', function() {
    //   cy.contains('New blog').click()
    //   cy.get('#title').type('a note created')
    //   cy.get('#author').type('cypress gaming')
    //   cy.get('#url').type('cypress.com')
    //   cy.contains('Create').click()
    //   cy.contains('a note created by cypress gaming')
    // })
      // it('blog can be liked', function() {
      //   cy.contains('New blog').click()
      //   cy.get('#title').type('a note created')
      //   cy.get('#author').type('cypress gaming')
      //   cy.get('#url').type('cypress.com')
      //   cy.contains('Create').click()
      //   cy.contains('a note created by cypress gaming')

      //   cy.contains('show').click()
      //   cy.contains('0')
      //   cy.contains('Like').click()
      //   cy.contains('1')
      // })
        it('blog can be deleted', function() {
          cy.contains('New blog').click()
          cy.get('#title').type('a note created')
          cy.get('#author').type('cypress gaming')
          cy.get('#url').type('cypress.com')
          cy.contains('Create').click()
          cy.contains('a note created by cypress gaming')

          cy.contains('show').click()
          cy.contains('Delete').click()
          cy.on('window:confirm', () => true);
          cy.get('html').should('not.contain', 'a note created by cypress gaming')
        })
  })
})