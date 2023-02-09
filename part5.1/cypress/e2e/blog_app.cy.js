/* eslint-disable no-undef */
describe('Blog app', function() {
  beforeEach(function() {
    // cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: "root",
      username: "Superuser",
      password: "salainen"
    }
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
})