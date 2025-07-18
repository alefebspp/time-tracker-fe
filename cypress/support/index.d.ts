declare namespace Cypress {
  interface Chainable {
    /**
     * Reseta o banco de dados para o estado inicial de teste
     */
    resetTestDb(): Chainable<void>;
  }
}
