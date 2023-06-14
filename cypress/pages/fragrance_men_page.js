export class FragranceMenPage {

    prices = 'div.pricetag.jumbotron div.price div:nth-child(1)'
    addToCart_btn = 'div.pricetag.jumbotron a.productcart'
    availableItemPrices = `div.pricetag.jumbotron a.productcart+div div:nth-child(1)`
    
    addItemsToCart() {
        cy.get(this.addToCart_btn).invoke('attr','href','#').eq(0).click()
        cy.get(this.availableItemPrices).eq(0).invoke("text") .then((price) => {
            const actualPrice = price.replace(/[^.0-9]/g, "")
            cy.writeDataInFile("cypress/fixtures/dynamicData.json", "actualPrice 0", actualPrice)
        })
        cy.get(this.addToCart_btn).invoke('attr','href','#').eq(1).click()
        cy.get(this.availableItemPrices).eq(1).invoke("text") .then((price) => {
            const actualPrice = price.replace(/[^.0-9]/g, "")
            cy.writeDataInFile("cypress/fixtures/dynamicData.json", "actualPrice 1", actualPrice)
        })
    }

      checkPrices() {
        var temp = 0
        cy.get(this.prices).invoke("text").then((txt) => {
            const price = txt.split("$");
            temp = price[1];
            cy.log('temp: ' + temp)
        })
        cy.get(this.prices).each(($el) => {
            const tempPrice = $el.text().split("$")
            const actualPrice = tempPrice[1]
            cy.log('actualPrice: ' + actualPrice)
            expect(temp <= actualPrice).to.be.true
        });
    }
}