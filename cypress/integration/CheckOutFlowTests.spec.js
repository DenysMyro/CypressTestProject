/// <reference types="cypress" />

import { CatalogPage } from "../PageObjects/CatalogPage";
import { ProductSuccessfullyAddedPopUp } from "../PageObjects/ProductSuccessfullyAddedPopUP"
import { ShoppingCartPage } from "../PageObjects/ShoppingCartPage"

const catalog = new CatalogPage()
const successPopUp = new ProductSuccessfullyAddedPopUp()
const cartPage = new ShoppingCartPage()

let CatalogItem //placeholder for purchasing item data set in Before
let currentUser //placeholder for user data set in Before

describe('Check Our flow Tests', () => {

    before(function () {
        cy.fixture('CatalogItems').then((itemToPurchase) => {
            CatalogItem = itemToPurchase[0];
        })
        cy.fixture('LoginValidUser').then((user) => {
            currentUser = user;
        })
    })

    it('User should be able to check out his added goods from cart', () => {

        catalog.VisitCategory(CatalogItem.CategoryID) // visiting T-shirts catalog 

        catalog.SelectSize(CatalogItem.Size)

        catalog.AddItemToCart(CatalogItem.ItemName)

        successPopUp.GET_POP_UP_FRAME().should('be.visible')

        successPopUp.GET_ADDED_PRODUCT_TITLE().should('have.text', CatalogItem.ItemName)

        successPopUp.GET_ADDED_PRODUCT_PRICE().should('have.text', CatalogItem.Price)

        successPopUp.GET_PROCEED_TO_CHEKOUT_BUTTON().click()

        cartPage.GET_PRODUCT_NAME().should('have.text', CatalogItem.ItemName)
    })
})