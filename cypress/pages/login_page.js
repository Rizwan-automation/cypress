export class LoginPage {

    username_textbox = '#loginFrm_loginname'
    password_textbox = '#loginFrm_password'
    login_button = `//button[@title='Login']`
    continue_button = `button[title='Continue']`

    enterUsername(username) {
        cy.get(this.username_textbox).type(username)
    }
    enterPassword(password) {
        cy.get(this.password_textbox).type(password)
    }
    clickLoginBtn() {
        cy.xpath(this.login_button).click()
    }
    clickContinueBtn() {
        cy.get(this.continue_button).click()
    }
}