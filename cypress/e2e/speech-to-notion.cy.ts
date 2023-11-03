describe('Speech to notion', () => {
  beforeEach( () => {
    cy.viewport('macbook-16');
    cy.visit('');
  })


  it('As a user I check that the navbar is in place with the logo', () => {
    cy.get('[data-cy=navbar]').should('exist');
    cy.get('[data-cy=logo]').should('exist');
  })

  it('As a user I can assess that my form contain 3 elements', () => {
    cy.get('[data-cy=input-sound]').should('exist');
    cy.get('[data-cy=input-document]').should('exist');
    cy.get('[data-cy=btn-generate]').should('exist');
  })

  it('As a user I load a file that contains sound and create a document on notion', () => {

    cy.get('[data-cy=alert-success]').should('not.exist');
    cy.get('[data-cy=link-to-notion-doc]').should('not.exist');

    cy.get('[data-cy=input-sound]').should('exist');
    cy.get('[data-cy=input-sound]').selectFile('cypress/fixtures/voice-test.wav');
    cy.get('[data-cy=input-document]').type('my document on notion');

    cy.get('[data-cy=btn-generate-default-text]').should('be.visible');

    cy.get('[data-cy=btn-generate]').should('not.be.disabled');
    cy.get('[data-cy=btn-generate]').click();

    cy.get('[data-cy=btn-generate-default-text]').should('not.exist');
    cy.get('[data-cy=btn-generate-in-progress]').should('be.visible');

    cy.get('[data-cy=link-to-notion-doc]').should('be.visible');
    cy.get('[data-cy=alert-success]').should('be.visible');
    cy.get('[data-cy=alert-success]').invoke('text').should('not.be.empty');
    cy.get('[data-cy=btn-generate-in-progress]').should('not.exist');
  })

  it('As a user, if I don\'t put a document name I should see an error message', () => {
    cy.get('[data-cy=input-document-error-required]').should('not.exist');

    cy.get('[data-cy=input-document]').type('my document on notion');
    cy.get('[data-cy=input-document]').clear();
    cy.get('[data-cy=input-document]').should('be.empty');

    cy.get('[data-cy=btn-generate]').should('be.disabled');

    cy.get('[data-cy=input-document-error-required]').should('be.visible');
    cy.get('[data-cy=btn-generate]').should('be.disabled');
  })
});
