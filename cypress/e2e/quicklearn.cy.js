import { QuickLearnPage } from "../pages/quicklearnTask6"

const quickLearnPage = new QuickLearnPage()


describe('Task 3', () => {
    beforeEach(() => {
       cy.visit('/')
   })
   it.skip('Case 1: Verify the beginner , intermediate and advance heading', function() {
        quickLearnPage.case1()
   })

   it('Case 2: Verify user land to we3School page for java tutorial', function() {
    quickLearnPage.case2()
})

})
