export class AuthenticationPage {

    //Locators 
    getURLtext() {
        return 'controller=authentication&back=my-account'
    }
    getLoginEmailInput() {
        return cy.get('#email');
    }
    getLoginPasswordInput() {
        return cy.get('#passwd');
    }
    getForgotPasswordLink() {
        return cy.get('.lost_password > a');
    }
    getLoginSubmitBtn() {
        return cy.get('#SubmitLogin > span');
    }
    getRegistrationEmailInput() {
        return cy.get('#email_create');
    }
    getRegistrationSumbitBtn() {
        return cy.get('#SubmitCreate > span');
    }
    
    //Actions
    visit() {
        cy.visit("/?controller=authentication&back=my-account");
    }
    submitLogIn(email, password) {
        cy.get('#email').clear().type(email)
        cy.get('#passwd').clear().type(password)
        cy.get('#SubmitLogin > span').click()
    }
    submitRegistration(email) {
        cy.get('#email_create').clear().type(email)
        cy.get('#SubmitCreate > span').click()
    }
    getRandomString() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 10; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
}