/// <reference types="cypress" />

import { AuthenticationPage } from "../PageObjects/AuthenticationPage";
import { myAccountPage } from "../PageObjects/myAccountPage";
import { PageHeader } from "../PageObjects/PageHeader";
import { AccountCreationPage } from "../PageObjects/AccountCreationPage";

const authPage = new AuthenticationPage()
const header = new PageHeader()
const myAccPage = new myAccountPage()
const userCreationPage = new AccountCreationPage()

let currentUser //placeholder for user data set in Before
let uuidStr // placeholder for unique identificator for user registration 

describe('Registration Tests with Fixtures Data', () => {

    beforeEach(function () {
        cy.fixture('UserRegistrationData').then((user) => {
            let count = Math.floor(Math.random() * Math.floor(user.length));
            currentUser = user[count]; //get random user from UserRegistrationData.json
            uuidStr = authPage.getRandomString() // get unique identificator for user registration 
        })
    })

    it('User should be able to pass Registration flow', () => {

        /**Given user opens Authorization page 
         * When user types valid, unused Email to #email_create input
         * And clicks #SubmitCreate button 
         * Then Account Creation page should be opened 
         * And user's email should be preffiled to the #email input 
         * When user fills all required filed 
         * And clicks Submit Accoutn Button 
         * Then My account Page should be opened 
         * And user should be authenticated
         */

        authPage.visit()

        authPage.submitRegistration(uuidStr + '+' + currentUser.email)

        cy.url({timeout: 10000}).should('include', userCreationPage.getURLtext())

        userCreationPage.getEmailInput().should('have.value', uuidStr + '+' + currentUser.email)

        userCreationPage.fillUserData(currentUser)

        userCreationPage.getAddressFristNameInput().should('have.value', currentUser.firstName)
        userCreationPage.getAddressLastNameInput().should('have.value', currentUser.lastName)

        userCreationPage.getSubmitAccountBtn().click()

        cy.url({timeout: 10000}).should('include', myAccPage.getURLtext())
        header.getLogOutBtn().should('exist')
        header.getProfileName().should('contain', currentUser.firstName+' '+currentUser.lastName)
    })
})

