export class CheckOutPage {

    //Locators
    GET_BREADCRUMB() {
        return cy.get('.breadcrumb')
    }
    GET_PRODUCT_NAME() {
        return cy.get('.cart_description > .product-name > a')
    }
    GET_TOTAL_PRODUCTS_PRICE() {
        return cy.get('#total_product')
    }
    GET_CURRENT_STEP_INDICATOR() {
        return cy.get('.step_current > span')
    }
    GET_PROCEED_BTN() {
        return cy.get('.cart_navigation > .button > span')
    }
    GET_RETURN_BTN() {
        return cy.get('.button-exclusive')
    }
    GET_DELIVERY_ADDRESS() {
        return cy.get('#address_delivery')
    }
    GET_BILLING_ADDRESS() {
        return cy.get('#address_invoice')
    }
    GET_DELIVERY_OPTION_RADIO_BTN() {
        return cy.get('#delivery_option_443735_0')
    }
    GET_DELIVERY_TERMS_CHECKBOX() {
        return cy.get('#cgv')
    }
    GET_BANKWIRE_BTN() {
        return cy.get('.bankwire')
    }
    GET_CHEQUE_BTN() {
        return cy.get('.cheque')
    }
    GET_PAGE_SUBHEADING() {
        return cy.get('.page-subheading')
    }
    GET_ORDER_COMPLETE_INDICATOR(){
        return cy.get('.cheque-indent > .dark')
    }
    GET_CHEQUE_CHECKOUT_SUCCESES_ALERT(){
        return cy.get('.alert')
    }

}