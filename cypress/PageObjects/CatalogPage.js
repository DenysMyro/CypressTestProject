export class CatalogPage {

    WomenCategoryURLtext = "id_category=3&controller=category"
    WomanCategoryTitle = "Women"
    DressesCategoryURLtext = "id_category=8&controller=category"
    DressesCategoryTitle = "Dresses"
    TshirtsCategoryURLtext = "id_category=5&controller=category"
    TshirtsCategoryTitle = "T-shirts"

    GET_WOMEN_URL_TEXT(){
        return this.WomenCategoryURLtext;
    }
    GET_WOMEN_PAGE_TITLE(){
        return this.WomanCategoryTitle;
    }
    GET_DRESSES_URL_TEXT(){
        return this.DressesCategoryURLtext;
    }
    GET_DRESSES_PAGE_TITLE(){
        return this.DressesCategoryTitle;
    }
    GET_TSHIRTS_URL_TEXT(){
        return this.TshirtsCategoryURLtext;
    }
    GET_TSHIRTS_PAGE_TITLE(){
        return this.TshirtsCategoryTitle;
    }

    GET_BREADCRUMB() {
        return cy.get('.breadcrumb')
    }
    GET_POSTER() {
        return cy.get('.content_scene_cat_bg')
    }
    GET_CATEGORIES_BLOCK() {
        return cy.get('#categories_block_left')
    }
    GET_FILTERS_BLOCK() {
        return cy.get('#layered_block_left')
    }
    GET_PAGE_HEADING_NAME(){
        return cy.get('.cat-name')
    }
    GET_PRODUCT_LIST(){
        return cy.get('.product_list')
    }

    //Actions

    GetRandomCategoryLink(){
        let links = ['Apple', 'Banana']
    }

}
