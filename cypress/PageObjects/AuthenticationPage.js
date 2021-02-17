export class AuthenticationPage {

    URL_TEXT = 'index.php?controller=authentication&back=my-account'
    PAGE_TITLE = 'Authentication'

    //Locators 
    GET_URL_TEXT() {
        return this.URL_TEXT
    }
    GET_PAGE_TITLE() {
        return this.PAGE_TITLE
    }
    GET_LOGIN_EMAIL_INPUT() {
        return cy.get('#email')
    }
    GET_LOGIN_PASSWORD_INPUT() {
        return cy.get('#passwd')
    }
    GET_LOGIN_SUBMIT_BTN() {
        return cy.get('#SubmitLogin > span')
    }
    GET_REGISTRATION_EMAIL_INPUT() {
        return cy.get('#email_create')
    }
    GET_REGISTRATION_SUBMIT_BTN() {
        return cy.get('#SubmitCreate > span')
    }

    //Actions
    visit() {
        cy.visit(this.URL_TEXT);
    }
    submitLogIn(email, password) {
        cy.get('#email')
            .clear()
            .type(email)

        cy.get('#passwd')
            .clear()
            .type(password)

        cy.get('#SubmitLogin > span').click()
    }
    submitRegistration(email) {
        cy.get('#email_create')
            .clear()
            .type(email)
            
        cy.get('#SubmitCreate > span').click()
    }
}