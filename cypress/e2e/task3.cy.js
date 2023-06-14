import { HomePage } from "../pages/home_page"
import { LoginPage } from "../pages/login_page"
import { SignupPage } from "../pages/signup_page"
import { FragranceMenPage } from "../pages/fragrance_men_page"
import { CheckoutPage } from "../pages/checkout_page"

const homePage = new HomePage()
const loginPage = new LoginPage()
const signupPage = new SignupPage()
const fragranceMenPage = new FragranceMenPage()
const checkoutPage = new CheckoutPage()


describe('Task 3', () => {
     before(() => {
        cy.visit('/')
    })
    it('Scenario : Login with valid credentials & sort the items from low to high', function() {
      homePage.clickloginlink()
      loginPage.clickContinueBtn()
      signupPage.fillSignUpForm()
      signupPage.clickContinueBtn()
      // loginPage.enterUsername(Cypress.env('username'))
      // loginPage.enterPassword(Cypress.env('password'))
      // loginPage.clickLoginBtn()
      homePage.verifyWelcomeMsg()
      homePage.clickSubMenuOption('Fragrance','Men')
      homePage.selectFilter()
      fragranceMenPage.checkPrices()
      fragranceMenPage.addItemsToCart()
      homePage.clickCheckoutButton()
      checkoutPage.verifyTotalItemsAddedInCart()
      checkoutPage.verifyQuantityOfAddedItemsInCart()
      checkoutPage.verifyTotalPriceOfAddedItemsInCart()

      // cy.addTestRailResult("T3572", "1");
    })
})



