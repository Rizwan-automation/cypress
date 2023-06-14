export class CheckoutPage {

    addedItemsQuantity = `//table[@class='table confirm_products']//td[4]`
    totalItemsInCart = `//table[@class='table confirm_products']//tr`
    addedItemsTotalPrice = `(//table[@class='table table-striped table-bordered']//td[2]//span[@class='bold '])[1]`
    subTotalPrice = `//span[contains(text(),'Sub-Total')]/parent::td/following-sibling::td`
    eyeMasterItemPrice = `(//a[contains(text(),'Eye master')]/parent::td/following-sibling::td[1])[1]`
    editCartButton = `//h4[contains(text(),'Items in your cart')]//a`
  
    verifyQuantityOfAddedItemsInCart() {
      var count = 0;
      var length = 0;
        cy.readFile("cypress/fixtures/dynamicData.json").then((obj) => {
          const endPoints = obj;
          length = Object.keys(obj).length
          cy.xpath(this.addedItemsQuantity).each(($el) => {
            count = count + parseInt($el.text())
          }).then(() => {
            expect(count).to.equal(length) // for Eye master(Item) it is selecting twice with 1 click so thats why added 1 here
          })
        })
    }

    verifyTotalPrice(time) {
      var sum = 0;
      var subTotal = 0;
      var eyeMasterPrice = 0;
      if (time === "first time") {
        cy.log("First Time")
        cy.readFile("cypress/fixtures/dynamicData.json").then((obj) => {
          const keys = Object.keys(obj);
          for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            sum = parseFloat(sum) + parseFloat(obj[key])
          }
  
          cy.xpath(this.subTotalPrice).invoke("text").then((txt) => {
            subTotal = parseFloat(txt.replace(/[^.0-9]/g, ""))
          }).then(() => {
            cy.xpath(this.eyeMasterItemPrice).invoke("text").then((txt) => { // for Eye master(Item) it is selecting twice with 1 click so thats why added its price again to subtotal
              eyeMasterPrice = parseFloat(txt.replace(/[^.0-9]/g, ""))
              expect(sum + eyeMasterPrice).to.equal(subTotal)
              cy.writeDataInFile("cypress/fixtures/dynamicData1.json", "subTotal", subTotal);
            })
          })
        })
      }
      else {
        cy.log("Second Time")
        cy.readFile("cypress/fixtures/dynamicData2.json").then((obj) => {
          const keys = Object.keys(obj);
          for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            sum = parseFloat(sum) + parseFloat(obj[key])
          }
          cy.xpath(this.subTotalPrice).invoke("text").then((txt) => {
            subTotal = parseFloat(txt.replace(/[^.0-9]/g, ""))
          }).then(() => {
            expect(sum).to.equal(subTotal)
          })
        })
      }
    }
    priceCheck() {
      let subTotalPrice
      cy.readFile("cypress/fixtures/dynamicData1.json").then((data) => {
        let price = data.check_amount
        let itemCount = data.totalItemsInCart
        cy.xpath(this.subTotalPrice).invoke("text").then((txt) => {
          subTotalPrice = parseFloat(txt.replace(/[^.0-9]/g, ""))
        }).then(() => {
          cy.log("subTotalPrice " + subTotalPrice)
          if (price >= subTotalPrice) {
            cy.writeDataInFile("cypress/fixtures/dynamicData2.json", "previousSubtotal", subTotalPrice);
            return
          }
          cy.log("itemCount " + itemCount)
          cy.xpath(`(//table[@class='table table-striped table-bordered']//tbody//tr)[${itemCount}]//td[7]//a`).click()
          itemCount = itemCount - 1
          cy.writeDataInFile("cypress/fixtures/dynamicData1.json", "totalItemsInCart", itemCount);
          this.priceCheck()
        })
      })
    }
    verifyTotalItemsAddedInCart() {
      cy.xpath(this.totalItemsInCart).should('have.length', 2)
    }
    clickEditCartButton() {
      cy.xpath(this.editCartButton).click()
    }
    verifyTotalPriceOfAddedItemsInCart(){
        var sum = 0;
        var subTotal = 0;
        cy.readFile("cypress/fixtures/dynamicData.json").then((obj) => {
            const keys = Object.keys(obj);
            for (let i = 0; i < keys.length; i++) {
              const key = keys[i];
              sum = parseFloat(sum) + parseFloat(obj[key])
            }
            cy.xpath(this.subTotalPrice).invoke("text").then((txt) => {
              subTotal = parseFloat(txt.replace(/[^.0-9]/g, ""))
            }).then(() => {
                expect(sum).to.equal(subTotal)
              })
          })
    }
  }