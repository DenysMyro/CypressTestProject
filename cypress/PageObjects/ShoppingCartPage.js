export class ShoppingCartPage {

    GET_BREADCRUMB() {
        return cy.get('.breadcrumb')
    }
    GET_PRODUCT_NAME(){
        return cy.get('.cart_description > .product-name > a')
    }

    get_button(){
        cy.get('.cart_navigation > .button > span')//proceed
        cy.get('.cart_description > .product-name > a')//product name

        cy.get('.first > a')//passed
        cy.get('.step_current > span')
        cy.get('.second > span')
        cy.get('.third > span')
        cy.get('.four > span')
        cy.get('.step_done_last > a')
        cy.get('#step_end > span')

        
        cy.get('#product_price_1_1_0 > .price')
        cy.get('.cart_quantity_input')
        cy.get('.cart_delete > div')
        cy.get('#total_product') //price
        cy.get('#total_shipping') //shipping
        cy.get('#total_price')//total sum

        cy.get('#address_delivery')
        cy.get('#address_invoice')
        cy.get('.address_add > .button > span')

        cy.get('#address_delivery > .address_firstname')
        cy.get('#address_delivery > .address_address1')
        cy.get('#address_delivery > .address_city')
        cy.get('#address_delivery > .address_country_name')
        cy.get('#address_delivery > .address_phone_mobile')

        cy.get('#address_invoice > .address_firstname')

        cy.get('td.delivery_option_radio')
        cy.get('#cgv')//delivery T&C
        cy.get('.cart_navigation > .button > span')


        cy.get('.cart_description > .product-name > a')
        cy.get('#product_price_1_1_443735 > .price')
        cy.get('.cart_quantity > span')
        cy.get('#total_price')

        cy.get('.bankwire')
        cy.get('.cheque')

        cy.get('.page-subheading')
        cy.get('#cart_navigation > .button > span')
        cy.get('.button-exclusive') // other payment methods

        cy.get('.cheque-indent > .dark') // order completed
        cy.get('.price > strong')
        cy.get('.box > :nth-child(5)')
        cy.get('.button-exclusive')
        cy.get('#step_end > span')
    }

}