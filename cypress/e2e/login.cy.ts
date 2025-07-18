describe("login spec", () => {
  before(() => {
    cy.resetTestDb();
  });

  it("should show error message if credentials are invalid", () => {
    cy.visit("http://localhost:5173/");

    cy.get("[name=email]").type("user@test.local");
    cy.get("[name=password]").type("invalid-password");
    cy.contains("Login").click();
    cy.contains("Email ou senha incorretos.").should("be.visible");
  });

  it("should go to dashbord after successfull login", () => {
    cy.visit("http://localhost:5173/");

    cy.get("[name=email]").type("user@test.local");
    cy.get("[name=password]").type("123456Test!");

    cy.contains("Login").click();

    cy.url().should("include", "dashboard");
  });
});
