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
    GET_FIRST_MENU_ITEM() {
        return cy.get('.sf-menu > :nth-child(1) > [href="http://automationpractice.com/index.php?id_category=3&controller=category"]')
    }
    GET_SECOND_MENU_ITEM() {
        return cy.get('.sf-menu > :nth-child(2) > .sf-with-ul')
    }
    GET_THIRD_MENU_ITEM() {
        return cy.get('.sf-menu > :nth-child(3) > a')
    }
}