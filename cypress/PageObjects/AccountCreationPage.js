export class AccountCreationPage {
    //Locators
    getURLtext() {
        return '#account-creation'
    }
    getEmailInput() {
        return cy.get('#email')
    }
    getAddressFristNameInptut() {
        return cy.get('#firstname')
    }
    getAddressLastNameInptut() {
        return cy.get('#lastname')
    }
    getSubmitAccountBtn() {
        return cy.get('#submitAccount > span')
    }

    //Actions 
    setDayOfBirth(dob) {
        if (dob) {
            var fields = dob.split('.');
            var day = fields[2].replace(/^0+/, '')
            var month = fields[1].replace(/^0+/, '')
            var year = fields[0]
            cy.get('#days').select(day)
            cy.get('#months').select(month)
            cy.get('#years').select(year)
        } else {
            cy.log('dob empty ' + dob)
        }
    }
    fillUserData(userObj) {

        //Fill Obligatory presonal data 
        cy.get('#customer_firstname').type(userObj.firstName)
        cy.get('#customer_lastname').type(userObj.lastName)
        cy.get('#passwd').type(userObj.password)
        cy.get('#address1').type(userObj.address1)
        cy.get('#city').type(userObj.city)
        cy.get('#postcode').type(userObj.zip)
        cy.get('#id_country').select(userObj.country)
        cy.get('#phone_mobile').type(userObj.phoneMobile)
        cy.get('#alias').clear().type(userObj.alias)
        cy.get('#id_state').select(userObj.state)

        //fill not Obligatory data 
        this.setDayOfBirth(userObj.dob)

        if (userObj.gender) {
            var genderId = (userObj.gender === 'male') ? '#id_gender1' : '#id_gender2';
            cy.get(genderId).click()
        }
        if (userObj.newsletter) {
            cy.get('#newsletter').click()
        }
        if (userObj.specialOffersoptin) {
            cy.get('#optin').click()
        }
        if (userObj.company) {
            cy.get('#company').type(userObj.company)
        }
        if (userObj.address2) {
            cy.get('#address2').type(userObj.address2)
        }
        if (userObj.other) {
            cy.get('#other').type(userObj.other)
        }
        if (userObj.phone) {
            cy.get('#phone').type(userObj.phone)
        }
    }
}
