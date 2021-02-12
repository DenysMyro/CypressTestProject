/// <reference types="cypress" />


import { AuthenticationPage } from "../PageObjects/AuthenticationPage";
import { myAccountPage } from "../PageObjects/myAccountPage";
import { PageHeader } from "../PageObjects/PageHeader";

const authPage = new AuthenticationPage()
const header = new PageHeader()
const myAccPage = new myAccountPage()

let currentUser //placeholder for currently loaded Fixture User data

describe('Login Tests with Fixtures Data', () => {

    before(function () {
        cy.fixture('LoginValidUser').then((user) => {
            currentUser = user;
        })
    })

    it('Valid user Logs In - should navigate to My Account page', () => {
        
        /**
         * Given user is on Authentication page 
         * When User fills valid email & password 
         * And clicks LogIn Submit button 
         * Then My Account Page should be opened 
         * And user should be authenticated
         */

        authPage.visit()
        authPage.submitLogIn(currentUser.email, currentUser.password)
        cy.url().should('include', myAccPage.GET_URL_TEXT())
        header.GET_LOGOUT_BTN().should('exist')
        header.GET_PROFILE_NAME().should('contain', currentUser.firstName+' '+currentUser.lastName)
    })
    it('User should be able to Log out', () => {

        /**
         * Given user already Authenticated 
         * When user click on Log Out button in the Page Header 
         * Then user should be logged out 
         * And Authentication page should be opened
         */

        header.GET_LOGOUT_BTN().should('exist').click()
        header.GET_LOGIN_BTN().should('exist')
        cy.url().should('include', authPage.GET_URL_TEXT())
    })
})