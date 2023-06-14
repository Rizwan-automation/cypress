export class SignupPage {

    firstNameField = '#AccountFrm_firstname'
    lastNameField = '#AccountFrm_lastname'
    emailField = `#AccountFrm_email`
    address1Field = `#AccountFrm_address_1`
    cityField = `#AccountFrm_city`
    countryDropdown = `#AccountFrm_country_id`
    stateDropdown = `#AccountFrm_zone_id`
    zipcodeField = `#AccountFrm_postcode`
    loginNameField = `#AccountFrm_loginname`
    passwordField = `#AccountFrm_password`
    confirmPasswordField = `#AccountFrm_confirm`
    newsletterSubscriptionOff = `#AccountFrm_newsletter0`
    policyAggrement_checkbox = `#AccountFrm_agree`
    continue_button = `button[title='Continue']`

    fillSignUpForm() {
        cy.get(this.firstNameField).type(Cypress.env('firstName'))
        cy.get(this.lastNameField).type(Cypress.env('lastName'))
        cy.createRandomEmail().then((emailId)=>{
            cy.get(this.emailField).type(emailId)
        })
        cy.get(this.address1Field).type(Cypress.env('address'))
        cy.get(this.cityField).type(Cypress.env('city'))
        cy.get(this.countryDropdown).select(Cypress.env('country'))
        cy.get(this.zipcodeField).type(Cypress.env('zipCode'))
        cy.get(this.stateDropdown).select(Cypress.env('state'))
        cy.createRandomName().then((username)=>{
            cy.get(this.loginNameField).type(username)
        })
        cy.get(this.passwordField).type(Cypress.env('password'))
        cy.get(this.confirmPasswordField).type(Cypress.env('password'))
        cy.get(this.newsletterSubscriptionOff).click()
        cy.get(this.policyAggrement_checkbox).click()
    }
    clickContinueBtn() {
        cy.get(this.continue_button).click()
    }
}