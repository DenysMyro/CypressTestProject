export class PageHeader {
    //Locators
    GET_PROFILE_NAME() {
        return cy.get('.account > span') // user name in the header
    }
    GET_LOGIN_BTN() {
        return cy.get('.login')
    }
    GET_LOGOUT_BTN() {
        return cy.get('.logout')
    }
}