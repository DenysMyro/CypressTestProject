/// <reference types="cypress" />

import { PageHeader } from "../PageObjects/PageHeader";
import { CatalogPage } from "../PageObjects/CatalogPage";
import { Utils } from "../Utils/Utils"

const header = new PageHeader()
const catalog = new CatalogPage()
const utils = new Utils()

describe('Catalog Tests', () => {

    beforeEach(function () {
        let categoryID = utils.getRandomNumberFromRange(3, 11)
        cy.log(categoryID)
        cy.log('#'+'/index.php?id_category=' + categoryID +  '&controller=category')
        cy.visit('/index.php?id_category=' + categoryID +  '&controller=category')
    })

    it('User should see basic catalog Elements on any category page ', () => {

        /**
         * Given is on Home page 
         * When user opens any category page 
         * Then Catalog page should be opened 
         * And loaded page should include: 
         * - Breadcrumbs Indicator 
         * - Categories bolock 
         * - Filters block 
         * - Page Header with catalog name 'Woman' 
         * - Products list 
        */


        header.GET_FIRST_MENU_ITEM()
            .should('have.text', catalog.GET_WOMEN_PAGE_TITLE())
            .click()

        catalog.GET_CATEGORIES_BLOCK()
            .should('exist')
            .and('be.visible')
        catalog.GET_FILTERS_BLOCK()
            .should('exist')
            .and('be.visible')
        catalog.GET_PRODUCT_LIST()
            .should('exist')
            .and('be.visible')
        catalog.GET_POSTER()
            .should('exist')
            .and('be.visible')
    })
    it('User should open Womens catalog with first menu item in Header', () => {

        /**
         * Given user is on Home page
         * When user click on first menu item from Navigation menu in the Header
         * Then 'Women' catalog page shoudl be opened 
        */

        header.GET_FIRST_MENU_ITEM()
            .should('have.text', catalog.GET_WOMEN_PAGE_TITLE())
            .click()

        cy.url().should('include', catalog.GET_WOMEN_URL_TEXT())

        catalog.GET_BREADCRUMB().should('include.text', catalog.GET_WOMEN_PAGE_TITLE())

        catalog.GET_PAGE_HEADING_NAME().should('include.text', catalog.GET_WOMEN_PAGE_TITLE())

    })

    it('User should open Dresses catalog with second menu item in Header', () => {

        /**
         * Given user is on Home page 
         * When user click on second menu item from Navigation menu in the Header
         * Then 'Dresses' catalog page should be opened 
        */

        header.GET_SECOND_MENU_ITEM()
            .should('have.text', catalog.GET_DRESSES_PAGE_TITLE())
            .click()

        cy.url().should('include', catalog.GET_DRESSES_URL_TEXT())

        catalog.GET_BREADCRUMB()
            .contains(catalog.GET_DRESSES_PAGE_TITLE()).should('be.visible')

        catalog.GET_PAGE_HEADING_NAME().should('include.text', catalog.GET_DRESSES_PAGE_TITLE())

    })
    it('User should open T-shirts catalog with second menu item in Header', () => {

        /**
         * Given user is on Home page 
         * When user click on second menu item from Navigation menu in the Header
         * Then 'T-Shirts' catalog page should be opened 
        */

        header.GET_THIRD_MENU_ITEM()
            .should('have.text', catalog.GET_TSHIRTS_PAGE_TITLE())
            .click()

        cy.url().should('include', catalog.GET_TSHIRTS_URL_TEXT())

        catalog.GET_BREADCRUMB()
            .contains(catalog.GET_TSHIRTS_PAGE_TITLE()).should('be.visible')

        catalog.GET_PAGE_HEADING_NAME().should('include.text', catalog.GET_TSHIRTS_PAGE_TITLE())

    })

})