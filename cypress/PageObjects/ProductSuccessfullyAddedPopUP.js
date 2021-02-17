export class ProductSuccessfullyAddedPopUp {

    GET_POP_UP_FRAME() {
        return cy.get('#layer_cart > .clearfix')
    }
    GET_PROCEED_TO_CHEKOUT_BUTTON() {
        return cy.get('.button-container > .button-medium > span')
    }
    GET_ADDED_PRODUCT_TITLE() {
        return cy.get('#layer_cart_product_title')
    }
    GET_ADDED_PRODUCT_PRICE() {
        return cy.get('#layer_cart_product_price')
    }
    GET_PRODUCT_ATTRIBUTES() {
        return cy.get('#layer_cart_product_attributes')
    }

}