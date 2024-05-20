describe('Automationexercise',()=> {

    it('Login url',()=>{

        //login to the automationexercise

        cy.visit("https://www.automationexercise.com/");
        

        
        cy.get("a[href='/login']").click();

        cy.get("input[data-qa='login-email']").type('qat@mailinator.com');
        cy.get("input[placeholder='Password']").type('123456');

        cy.get("button[data-qa='login-button']").click();


      //labels and prices of featured items, sort them, and print on console

        
     cy.get('.features_items .productinfo').each(($el) => {
        const label = $el.find('p').text();
        const priceText = $el.find('h2').text();
        const price = parseFloat(priceText.replace(/[^0-9.-]+/g, ""));
    
        cy.log(`Label: ${label}, Price: ${price}`);
      });
  
      cy.get('.features_items .productinfo').then(($items) => {
        const products = Array.from($items).map(item => {
          const label = Cypress.$(item).find('p').text();
          const priceText = Cypress.$(item).find('h2').text();
          const price = parseFloat(priceText.replace(/[^0-9.-]+/g, ""));
          return { label, price };
        });
  
        products.sort((a, b) => a.price - b.price);
        products.forEach(product => {
            cy.log(`Label: ${product.label}, Price: ${product.price}`);

          console.log(`Label: ${product.label}, Price: ${product.price}`);
        });
      });


             // Select the Fancy Green Top and add to the cart

            cy.get(':nth-child(1) > .panel-heading > .panel-title > a').click();

            cy.get("a[href='/category_products/2']").click();
            cy.get('a[href="/product_details/8"]').click();
            cy.url().should('contains', 'https://www.automationexercise.com/product_details/8');
            cy.get('.cart').click();
            cy.get('.btn-success').click();


             // Select the summer white top and add to the cart

            cy.get('.panel:nth-child(1) .badge').click();
            cy.get('#Women > .panel-body > ul > :nth-child(2) > a').click();
            cy.get('a[href="/product_details/6"]').click();

            //cy.url().should('contains', 'https://www.automationexercise.com/product_details/5"]');
            cy.url().should('contains', 'https://www.automationexercise.com/product_details/6');
            cy.get('.cart').click();
            cy.get('.btn-success').click();

            cy.get(':nth-child(5) > .btn').click();



            
     


        //View Item added Cart
        cy.get('u').click();
        cy.get('.btn.btn-default.check_out').click();
        cy.get('.form-control').type('Can i get your contact');
        cy.get(':nth-child(7) > .btn').click();

        //Proceed to check out and add card details.

        cy.get('[data-qa="name-on-card"]').type('Test Card');
        cy.get('[data-qa="card-number"]').type('4100 0000 0000');
        cy.get('[data-qa="cvc"]').type('123');
        cy.get('[data-qa="expiry-month"]').type('01');
        cy.get('[data-qa="expiry-year"]').type('1900');

        cy.get('[data-qa="pay-button"]').click();

        //confirmation of order
        cy.get('[data-qa="order-placed"] > b').should('be.visible')

        cy.get('.col-sm-9 > p').should('contain', 'Congratulations! Your order has been confirmed!')
















    })


})