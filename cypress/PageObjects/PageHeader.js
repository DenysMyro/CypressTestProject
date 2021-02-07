export class PageHeader {
    //Locators
    getProfileName() {
        return cy.get('.account > span') // user name in the header
    }
    getLogInBtn() {
        return cy.get('.login')
    }
    getLogOutBtn() {
        return cy.get('.logout')
    }
}