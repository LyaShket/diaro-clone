/// <reference types="cypress" />

import { clientUrl } from '../../../src/app/shared/constants/url/url';

context('Create entry', () => {
  beforeEach(() => {
    cy.visit(clientUrl);

    cy.get('#header #log-in').click();
    cy.get('.modal #username').type('testuserss');
    cy.get('.modal #password').type('testuserss');
    cy.get('.modal #submit').click();
    cy.get('.modal').should('not.exist');
    cy.get('#toast-container .toast-success').should('contain.text', 'Login success');

    cy.visit(clientUrl + '/entry/new');
  });

  it('display create entry form', () => {
    cy.get('app-entry-form').should('exist');
  });

})
