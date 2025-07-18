/// <reference types="cypress" />

Cypress.Commands.add("resetTestDb", () => {
  cy.request("POST", "http://localhost:3000/test/reset");
});
