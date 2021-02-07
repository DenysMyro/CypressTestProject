export class myAccountPage {

    //Locators
    getURLtext() {
        return '?controller=my-account'
    }

    //Actions
    visit() {
        cy.visit('?controller=my-account')
    }
}