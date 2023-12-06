// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("createNewBlog", (title, author, url) => {
  cy.get("button").contains("new blog").should("be.visible").click();

  cy.get("#title").should("be.visible").type(title);

  cy.get("#author").should("be.visible").type(author);

  cy.get("#url").should("be.visible").type(url);

  cy.get('button[type="submit"]').should("be.visible").click();

  cy.get("#notification.success")
    .contains(`A new blog ${title} by ${author} added`)
    .should("be.visible");

  cy.get(".blogItem").contains(title).should("be.visible");

  cy.get(".blogItem").contains(author).should("be.visible");
});

Cypress.Commands.add("likeBlog", (blogTitle) => {
  cy.get(`.blogItem[blog-data="${blogTitle}"]`)
    .find("button")
    .contains("View")
    .click();

  cy.get(`.blogItem[blog-data="${blogTitle}"]`)
    .find("button")
    .contains("like")
    .click();
});
