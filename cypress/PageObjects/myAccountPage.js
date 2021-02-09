export class myAccountPage {

    //Locators
    GET_URL_TEXT() {
        return '?controller=my-account'
    }

    //Actions
    visit() {
        cy.visit('?controller=my-account')
    }
}