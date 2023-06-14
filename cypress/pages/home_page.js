export class HomePage {

    login_link = `//a[contains(text(),'Login or register')]`
    welcome_msg = `//ul[@id='customer_menu_top']//div[contains(text(),'Welcome back Rizwan')]`
    checkout_btn = `//a[@title='Checkout']`
    filter = `#sort`

    clickloginlink() {
        cy.xpath(this.login_link).click()
    }
    verifyWelcomeMsg() {
        cy.xpath(this.welcome_msg).should('have.text', 'Welcome back Rizwan')
    }
    selectCurrency(currency) {
        cy.xpath(`//a[contains(text(),'${currency}')]`).click({ force: true })
    }
    clickSubMenuOption(menuOption, subMenuOption) {
        cy.xpath(`(//section[@id='categorymenu']//a[contains(text(),'${menuOption}')])[1]/following-sibling::div//a[contains(text(),'${subMenuOption}')]`).click({ force: true })
    }
    clickMenuOption(menuOption) {
        cy.xpath(`(//section[@id='categorymenu']//a[contains(text(),'${menuOption}')])[1]`).click({ force: true })
    }
    clickCheckoutButton() {
        cy.xpath(this.checkout_btn).click({ force: true })
    }
    selectFilter(){
        cy.get(this.filter).select('Price Low > High')
    }
}