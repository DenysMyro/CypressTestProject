/// <reference types="cypress" />

import { CatalogPage } from "../PageObjects/CatalogPage";
import { ProductSuccessfullyAddedPopUp } from "../PageObjects/ProductSuccessfullyAddedPopUP"
import { CheckOutPage } from "../PageObjects/CheckOutPage"
import { AuthenticationPage } from "../PageObjects/AuthenticationPage"

const catalog = new CatalogPage()
const successPopUp = new ProductSuccessfullyAddedPopUp()
const cartPage = new CheckOutPage()
const authPage = new AuthenticationPage()

let CatalogItem //placeholder for purchasing item data set in Before
let currentUser //placeholder for user data set in Before

describe('End2End Check Our flow Tests', () => {

    before(function () {
        cy.fixture('CatalogItems').then((itemToPurchase) => {
            CatalogItem = itemToPurchase[0];
        })
        cy.fixture('LoginValidUser').then((user) => {
            currentUser = user;
        })
    })

    it('Unauthenticated user should be able to check out with BankWire payment method', () => {

        /**
         * Given user is not authenticated yet
         * When user opens catalog page 
         * And click 'Add to cart' button of currently focused catalog item 
         * Then Selected Item should be added to the cart 
         * And Pop Up 'Product successfully added to your shopping cart' should be shown with Addet item details
         * When user clicks on the 'Proceed to checout' button from the 'successfully added' pop up
         * Then Check Out Page should be opened with the first step 'Card Summary'
         * And Card Summary Should include details about added goods
         * When user clicks on the 'Proceed' button 
         * Then step 2 Authentification of the Check Out flow should be opened 
         * And Sign in inputs should be avaialbe 
         * When user submits valid credentials to the sing in form 
         * Then user should be authenticated 
         * And step 3 'Address Confirmation' of Check Out flow should be opened
         * And User's address should mathing Billing and Delivery adderesses dispalayed on the page 
         * When User clicks on the 'Proceed' button 
         * Then step 4 Shipping of the Check Out flow should be opened
         * And list of available shipping options should be displayed 
         * When user confirms shipping Terms with check box
         * And clicks on the 'Proceed' button 
         * Then step 5 Payment method of Check Out flow should be opened
         * And Card overview should be displayed with items details 
         * And Available billing options should be displayed 
         * When User clicks on the Bank wire payment method
         * Then Bank wire Payment Details Should be opened 
         * When User clicks on the 'Proceed' button 
         * Then User's order Should be confirmed 
         * And Order Confrimation page with 'Order complete' message should be opened 
         * When user clicks on the 'Back to orders' button from Order Confrimation page
         * Then Orders History page of MY Account should be opened 
         */

        catalog.VisitCategory(CatalogItem.CategoryID) // visiting T-shirts catalog 

        catalog.SelectSize(CatalogItem.Size)

        catalog.AddItemToCart(CatalogItem.ItemName)

        successPopUp.GET_POP_UP_FRAME().should('be.visible')

        successPopUp.GET_ADDED_PRODUCT_TITLE().should('have.text', CatalogItem.ItemName)

        successPopUp.GET_ADDED_PRODUCT_PRICE().should('have.text', CatalogItem.Price)

        successPopUp.GET_PROCEED_TO_CHEKOUT_BUTTON().click()

        //Check out step 1

        cartPage.GET_CURRENT_STEP_INDICATOR().should('have.text', '01. Summary')

        cartPage.GET_BREADCRUMB()
            .contains('Your shopping cart')
            .should('be.visible')

        cartPage.GET_PRODUCT_NAME().should('have.text', CatalogItem.ItemName)

        cartPage.GET_TOTAL_PRODUCTS_PRICE().should('have.text', CatalogItem.Price)

        cartPage.GET_PROCEED_BTN().click()

        //Check out step 2

        cartPage.GET_BREADCRUMB()
            .contains(authPage.GET_PAGE_TITLE())
            .should('be.visible')

        cartPage.GET_CURRENT_STEP_INDICATOR().should('have.text', '02. Sign in')

        authPage.submitLogIn(currentUser.email, currentUser.password)

        //Check out step 3

        cartPage.GET_BREADCRUMB()
            .contains('Addresses')
            .should('be.visible')

        cartPage.GET_CURRENT_STEP_INDICATOR().should('have.text', '03. Address')

        //verify Delinvery address
        cartPage.GET_DELIVERY_ADDRESS().invoke("text").should(($address) => {
            expect($address).contain(currentUser.firstName + ' ' + currentUser.lastName)
            expect($address).contain(currentUser.address1)
            expect($address).contain(currentUser.city)
            expect($address).contain(currentUser.state)
            expect($address).contain(currentUser.zip)
            expect($address).contain(currentUser.country)
            expect($address).contain(currentUser.phone)
        })

        //verify Billing address
        cartPage.GET_BILLING_ADDRESS()
            .should('contain.text', currentUser.firstName + ' ' + currentUser.lastName)
            .and('contain.text', currentUser.address1)
            .and('contain.text', currentUser.city)
            .and('contain.text', currentUser.state)
            .and('contain.text', currentUser.zip)
            .and('contain.text', currentUser.country)
            .and('contain.text', currentUser.phone)

        cartPage.GET_PROCEED_BTN().click()

        //Check out step 4
        cartPage.GET_BREADCRUMB()
            .contains('Shipping')
            .should('be.visible')

        cartPage.GET_CURRENT_STEP_INDICATOR().should('have.text', '04. Shipping')

        cartPage.GET_DELIVERY_OPTION_RADIO_BTN().should('be.checked')

        cartPage.GET_DELIVERY_TERMS_CHECKBOX()
            .check()
            .should('be.checked')

        cartPage.GET_PROCEED_BTN().click()

        //Check out step 5
        cartPage.GET_BREADCRUMB()
            .contains('Your payment method')
            .should('be.visible')

        cartPage.GET_CURRENT_STEP_INDICATOR().should('have.text', '05. Payment')

        cartPage.GET_PRODUCT_NAME().should('have.text', CatalogItem.ItemName)

        cartPage.GET_TOTAL_PRODUCTS_PRICE().should('have.text', CatalogItem.Price)

        //Select Payment method 
        cartPage.GET_BANKWIRE_BTN().click()

        cartPage.GET_BREADCRUMB()
            .contains('Bank-wire payment.')
            .should('be.visible')

        cartPage.GET_PAGE_SUBHEADING().should('include.text', 'Bank-wire payment.')

        cartPage.GET_PROCEED_BTN()
            .should('have.text', 'I confirm my order')
            .click()

        cartPage.GET_BREADCRUMB()
            .contains('Order confirmation')
            .should('be.visible')

        cartPage.GET_ORDER_COMPLETE_INDICATOR().should('have.text', 'Your order on My Store is complete.')

        cartPage.GET_RETURN_BTN()
            .should('have.text', 'Back to orders')
            .click()

        cy.url().should('include', 'history')

    })

    it('Authenticated user should be able to check out with Cheque payment method', () => {

        /**
         * Given user is already Authenticated
         * When user opens catalog page 
         * And click 'Add to cart' button of currently focused catalog item 
         * Then Selected Item should be added to the cart 
         * And Pop Up 'Product successfully added to your shopping cart' should be shown with Addet item details
         * When user clicks on the 'Proceed to checout' button from the 'successfully added' pop up
         * Then Check Out Page should be opened with the first step 'Card Summary'
         * And Card Summary Should include details about added goods
         * When user clicks on the 'Proceed' button 
         * Then step 2 Authentification of the Check Out flow should be skipped  
         * And step 3 'Address Confirmation' of Check Out flow should be opened instead
         * And User's address should mathing Billing and Delivery adderesses dispalayed on the page 
         * When User clicks on the 'Proceed' button 
         * Then step 4 Shipping of the Check Out flow should be opened
         * And list of available shipping options should be displayed 
         * When user confirms shipping Terms with check box
         * And clicks on the 'Proceed' button 
         * Then step 5 Payment method of Check Out flow should be opened
         * And Card overview should be displayed with items details 
         * And Available billing options should be displayed 
         * When User clicks on the Cheque payment method
         * Then Cheque Payment Details Should be opened 
         * When User clicks on the 'Proceed' button 
         * Then User's order Should be confirmed 
         * And Order Confrimation page with 'Order complete' message should be opened 
         * When user clicks on the 'Back to orders' button from Order Confrimation page
         * Then Orders History page of MY Account should be opened 
         */

        authPage.visit()

        authPage.submitLogIn(currentUser.email, currentUser.password)

        catalog.VisitCategory(CatalogItem.CategoryID) // visiting T-shirts catalog 

        catalog.SelectSize(CatalogItem.Size)

        catalog.AddItemToCart(CatalogItem.ItemName)

        successPopUp.GET_POP_UP_FRAME().should('be.visible')

        successPopUp.GET_ADDED_PRODUCT_TITLE().should('have.text', CatalogItem.ItemName)

        successPopUp.GET_ADDED_PRODUCT_PRICE().should('have.text', CatalogItem.Price)

        successPopUp.GET_PROCEED_TO_CHEKOUT_BUTTON().click()

        //Check out step 1

        cartPage.GET_CURRENT_STEP_INDICATOR().should('have.text', '01. Summary')

        cartPage.GET_BREADCRUMB()
            .contains('Your shopping cart')
            .should('be.visible')

        cartPage.GET_PRODUCT_NAME().should('have.text', CatalogItem.ItemName)

        cartPage.GET_TOTAL_PRODUCTS_PRICE().should('have.text', CatalogItem.Price)

        cartPage.GET_PROCEED_BTN().click()

        //Check out step 2 Authentication is skipped for already signed users

        //Check out step 3

        cartPage.GET_BREADCRUMB()
            .contains('Addresses')
            .should('be.visible')

        cartPage.GET_CURRENT_STEP_INDICATOR().should('have.text', '03. Address')

        //verify Delinvery address
        cartPage.GET_DELIVERY_ADDRESS().invoke("text").should(($address) => {
            expect($address).contain(currentUser.firstName + ' ' + currentUser.lastName)
            expect($address).contain(currentUser.address1)
            expect($address).contain(currentUser.city)
            expect($address).contain(currentUser.state)
            expect($address).contain(currentUser.zip)
            expect($address).contain(currentUser.country)
            expect($address).contain(currentUser.phone)
        })

        //verify Billing address
        cartPage.GET_BILLING_ADDRESS()
            .should('contain.text', currentUser.firstName + ' ' + currentUser.lastName)
            .and('contain.text', currentUser.address1)
            .and('contain.text', currentUser.city)
            .and('contain.text', currentUser.state)
            .and('contain.text', currentUser.zip)
            .and('contain.text', currentUser.country)
            .and('contain.text', currentUser.phone)

        cartPage.GET_PROCEED_BTN().click()

        //Check out step 4
        cartPage.GET_BREADCRUMB()
            .contains('Shipping')
            .should('be.visible')

        cartPage.GET_CURRENT_STEP_INDICATOR().should('have.text', '04. Shipping')

        cartPage.GET_DELIVERY_OPTION_RADIO_BTN().should('be.checked')

        cartPage.GET_DELIVERY_TERMS_CHECKBOX()
            .check()
            .should('be.checked')

        cartPage.GET_PROCEED_BTN().click()

        //Check out step 5
        cartPage.GET_BREADCRUMB()
            .contains('Your payment method')
            .should('be.visible')

        cartPage.GET_CURRENT_STEP_INDICATOR().should('have.text', '05. Payment')

        cartPage.GET_PRODUCT_NAME().should('have.text', CatalogItem.ItemName)

        cartPage.GET_TOTAL_PRODUCTS_PRICE().should('have.text', CatalogItem.Price)

        //Select Payment method 
        cartPage.GET_CHEQUE_BTN().click()

        cartPage.GET_BREADCRUMB()
            .contains('Check payment')
            .should('be.visible')

        cartPage.GET_PAGE_SUBHEADING().should('include.text', 'Check payment')

        cartPage.GET_PROCEED_BTN()
            .should('have.text', 'I confirm my order')
            .click()

        cartPage.GET_BREADCRUMB()
            .contains('Order confirmation')
            .should('be.visible')

        cartPage.GET_CHEQUE_CHECKOUT_SUCCESES_ALERT().should('have.text', 'Your order on My Store is complete.')

        cartPage.GET_RETURN_BTN()
            .should('have.text', 'Back to orders')
            .click()

        cy.url().should('include', 'history')

    })

})