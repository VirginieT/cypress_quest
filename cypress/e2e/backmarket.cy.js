const { faker } = require('@faker-js/faker');

const email = faker.internet.email();
const password = faker.internet.password();
const name = faker.name.firstName();
const lastname = faker.name.lastName();


// Automatiser un scénario de test d'inscription réussie
describe('Success', () => {
  it('Registration successful', () => {
    cy.visit('https://preprod.backmarket.fr/register')
    cy.url().should('include', '/register')
    cy.title().should('include', 'Back Market')
    cy.contains('Nouveau client ? Par ici, s\'il vous plaît.').should('be.visible');
    cy.wait(1000)
    cy.get('#firstname').type(name)
    cy.get('#lastname').type(lastname)
    cy.get('#signup-email').type(email)
    cy.get('#signup-password').type(password)
    cy.get('button[type="submit"]').click()
    cy.wait(2000)
    cy.url().should('include', '/dashboard')
  })
})


// Automatiser un scénario de test d'inscription échouée
describe('Fail', () => {
  it('Registration failed', () => {
    cy.visit('https://preprod.backmarket.fr/register')
    cy.url().should('include', '/register')
    cy.contains('Nouveau client ? Par ici, s\'il vous plaît.').should('be.visible');
    cy.wait(1000)
    cy.get('#firstname').type(name)
    cy.get('#lastname').type(lastname)
    cy.get('#signup-email').type('email@email.com')
    cy.get('#signup-password').type(password)
    cy.get('#signup-password-confirm').type(password)
    cy.contains('Sign Up').click()
    cy.wait(2000)
    cy.get('p.text-primary-light').should('have.text', 'Un utilisateur avec cette adresse email existe déjà')
  })
})



// Automatiser les tests d'authentification
describe('Success', () => {
  it('Authentication successful', () => {
    cy.visit('https://preprod.backmarket.fr/register')
    cy.url().should('include', '/register')
    cy.title().should('include', 'Back Market')
    cy.wait(1000)
    cy.get('#signin-email').type(email)
    cy.get('#signin-password').type(password)
    cy.contains('Welcome Back').click()
    cy.wait(2000)
    cy.url().should('include', '/dashboard')
  })
})

describe('Fail', () => {
  it('Authentication failed', () => {
    cy.visit('https://preprod.backmarket.fr/register')
    cy.url().should('include', '/register')
    cy.wait(1000)
    cy.get('#signin-email').type('email@email.com')
    cy.get('#signin-password').type('password1234')
    cy.contains('Welcome Back').click()
    cy.wait(2000)
    cy.contains('Saisissez un e-mail et un mot de passe valides.')
  })
})






