export class myAccountPage {
    URL_TEXT = '?controller=my-account'

    //Locators
    GET_URL_TEXT() {
        return this.URL_TEXT
    }

    //Actions
    visit() {
        cy.visit(this.URL_TEXT)
    }
}