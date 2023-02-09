/// <reference types="cypress" />

import * as uniqid from 'uniqid';
import { clientUrl } from '../../../src/app/shared/constants/url/url';

context('Login', () => {
  beforeEach(() => {
    cy.visit(clientUrl);
  });

  it('display register button in header', () => {
    cy.get('#header #sign-up')
      .should('have.text', 'Sign Up')
      .should('exist');
  });

  it('open register modal', () => {
    cy.get('#header #sign-up').click();
    cy.get('.modal').should('exist');
    cy.get('.modal h2').should('have.text', 'Sign Up');
  });

  it('register with valid credentials', () => {
    cy.get('#header #sign-up').click();

    const username = 'user' + uniqid();
    const password = uniqid();

    cy.get('.modal #username').type(username);
    cy.get('.modal #password').type(password);
    cy.get('.modal #repeat-password').type(password);
    cy.get('.modal #submit').click();
    cy.get('.modal').should('not.exist');
    cy.get('#toast-container .toast-success').should('contain.text', 'Register success');
  });

  it('do not register with existing username', () => {
    cy.get('#header #sign-up').click();
    cy.get('.modal #username').type('testuserss');
    cy.get('.modal #password').type('somepassword');
    cy.get('.modal #repeat-password').type('somepassword');
    cy.get('.modal #submit').click();
    cy.get('.modal').should('not.exist');
    cy.get('#toast-container .toast-error').should('contain.text', 'Register error');
  });
})
