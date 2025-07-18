describe("register spec", () => {
  before(() => {
    cy.resetTestDb();
  });

  it("should show error message if user already exists", () => {
    cy.visit("http://localhost:5173/cadastro");

    cy.get("[name=name]").type("Test User");
    cy.get("[name=email]").type("user@test.local");
    cy.get("[name=password]").type("123456Test!");
    cy.get("[name=confirm_password]").type("123456Test!");

    cy.contains("Registrar").click();
    cy.contains("Email já registrado").should("be.visible");
  });

  it("should go to login page after successfull register", () => {
    cy.visit("http://localhost:5173/cadastro");

    cy.get("[name=name]").type("Test User");
    cy.get("[name=email]").type("user2@test.local");
    cy.get("[name=password]").type("123456Test!");
    cy.get("[name=confirm_password]").type("123456Test!");

    cy.contains("Registrar").click();

    cy.url().should("equal", "http://localhost:5173/");
  });
});
