/// <reference types="cypress" />

it('Sample', () => {
  cy.visit('http://automationpractice.com/index.php')
  cy.url().should('include', 'automationpractice')
  cy.get('a[title ="Women"]').click()
  cy.get('.navigation_page').should('have.text', 'Women')
})