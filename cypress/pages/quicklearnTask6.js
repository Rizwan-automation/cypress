export class QuickLearnPage {

    explore_button = '#exploreBtn'
    designing_button = `//button[text()='Designing']`
    photo_button = `//button[contains(text(),'Photo')]`
    beginner_heading = `//div[@id='beginnerResourceBox']/preceding-sibling::h4`
    intermediate_heading = `//div[@id='intermediateResourceBox']/preceding-sibling::h4[1]`
    advance_heading = `//div[@id='advancedResourceBox']/preceding-sibling::h4[1]`

    start_learning_button = `//a[text()='START LEARNING']`
    programming_button = `//button[text()='Programming']`
    python_button = `//button[contains(text(),'Python')]`
    viewMore_button = `//h5[text()='W3Schools']/following-sibling::a`


    case1(){
        cy.get(this.explore_button).should('be.visible').click()
        cy.xpath(this.designing_button).should('be.visible').click()
        cy.xpath(this.photo_button).should('be.visible').click()
        cy.xpath(this.beginner_heading).should('have.text',"Beginner")
        cy.xpath(this.intermediate_heading).should('have.text',"Intermediate")
        cy.xpath(this.advance_heading).should('have.text',"Advanced")
    }

    case2(){
        cy.xpath(this.start_learning_button).should('be.visible').click()
        cy.xpath(this.programming_button).should('be.visible').click()
        cy.xpath(this.python_button).should('be.visible').click()
        // cy.xpath(this.viewMore_button).should('be.visible').click()
        cy.xpath(this.viewMore_button).should('be.visible').invoke('removeAttr', 'target').click()
        // cy.url().should('include', '/python')
        // cy.title().should('eq', 'Python Tutorial')
        cy.xpath(`//h1[text()='Python ']`).should('have.text',"Python Tutorial")
    }
}