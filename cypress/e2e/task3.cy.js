// import { CheckoutPage } from "../pages/checkout_page"
// import { FragranceMenPage } from "../pages/fragrance_men_page"
// import { HomePage } from "../pages/home_page"
// import { LoginPage } from "../pages/login_page"
// import { SignupPage } from "../pages/signup_page"

// const loginPage = new LoginPage()
// const signupPage = new SignupPage()
// const homePage = new HomePage()
// const checkoutPage = new CheckoutPage()
// const fragranceMenPage = new FragranceMenPage()

describe('Task 3', () => {
     before(() => {
        cy.visit('/')
    })
    it('Scenario : Login with valid credentials & sort the items from low to high', function() {
      loginPage.clickloginlink()
      loginPage.clickContinueBtn()
      signupPage.fillSignUpForm()
      signupPage.clickContinueBtn()
      // loginPage.enterUsername(Cypress.env('username'))
      // loginPage.enterPassword(Cypress.env('password'))
      // loginPage.clickLoginBtn()
      loginPage.verifyWelcomeMsg()

      homePage.clickSubMenuOption('Fragrance','Men')
      homePage.selectPriceFilter()

      fragranceMenPage.checkPrices()
      fragranceMenPage.addItemsToCart()
      fragranceMenPage.clickCheckoutButton()

      checkoutPage.verifyTotalItemsAddedInCart()
      checkoutPage.verifyQuantityOfAddedItemsInCart()
      checkoutPage.verifyTotalPriceOfAddedItemsInCart()

      // cy.addTestRailResult("T3572", "1");
    })
})



