/// <reference types="cypress" />

import { clientUrl } from '../../../src/app/shared/constants/url/url';

context('Login', () => {
  beforeEach(() => {
    cy.visit(clientUrl);
  });

  it('display login button in header', () => {
    cy.get('#header #log-in')
      .should('have.text', 'Log In')
      .should('exist');
  });

  it('open login modal', () => {
    cy.get('#header #log-in').click();
    cy.get('.modal').should('exist');
    cy.get('.modal h2').should('have.text', 'Log In');
  });

  it('login with valid credentials', () => {
    cy.get('#header #log-in').click();
    cy.get('.modal #username').type('testuserss');
    cy.get('.modal #password').type('testuserss');
    cy.get('.modal #submit').click();
    cy.get('.modal').should('not.exist');
    cy.get('#toast-container .toast-success').should('contain.text', 'Login success');
  });

  it('do not login with invalid credentials', () => {
    cy.get('#header #log-in').click();
    cy.get('.modal #username').type('testuserss');
    cy.get('.modal #password').type('testuserss1');
    cy.get('.modal #submit').click();
    cy.get('.modal').should('not.exist');
    cy.get('#toast-container .toast-error').should('contain.text', 'Login error');
  });
})
