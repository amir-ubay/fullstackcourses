describe('Blog App', () => {
  beforeEach(function () {
    cy.visit('http://localhost:5173/')
  })
  
  it('Login form is shown', () => {
    cy.get('#login-form')
      .within(() => {
        cy.get('h2').should('be.visible').should('contain', 'Log in to application')
      })

    cy.get('#username-input')
      .should('be.visible')
      .should('contain', 'username')
      .within(() => {
        cy.get('input#username').should('be.visible')
      })
    
    cy.get('#password-input')
      .should('be.visible')
      .should('contain', 'password')
      .within(() => {
        cy.get('input#password').should('be.visible')
      })
    
    cy.get('button#login-button')
      .should('be.visible')
  })
})