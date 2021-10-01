/* eslint-disable no-undef */
/// <reference types="cypress"/>

describe('Caso de Teste: Testar funcionalidades do menu de opções no header da aplicação', () => {
  beforeEach(() => {
    cy.visit('https://locus-app.vercel.app')
  })

  it('Cenario: Navegar até a tela de dados da conta e alterar o nome do usuário', () => {
    handleLogin()

    cy.get('.dropdown-toggle > img').click()
    cy.get('ul > :nth-child(1) > a').click()

    cy.get(':nth-child(1) > .input-container > input')
      .focus()
      .clear()
      .type('Vanessa')
    cy.get('form > .button-container').click()

    cy.intercept(
      {
        method: 'PUT',
        url: '/user'
      },
      {}
    )

    cy.get('h1').should('contain.text', 'Deu tudo certo :D')
    cy.get('.user-info > p').should('contain.text', 'Vanessa')
  })

  it('Cenario: Navegar até a tela de favoritos', () => {
    handleLogin()

    cy.get('.dropdown-toggle > img').click()
    cy.get('ul > :nth-child(2) > a').click()

    cy.url().should('include', '/favorite')
  })

  it('Cenario: Navegar até a tela de anuncio e anunciar um novo imóvel', () => {
    handleLogin()

    cy.get('.dropdown-toggle > img').click()
    cy.get('ul > :nth-child(3) > a').click()
    cy.get('.title > h1').contains('Anunciar')
    cy.get('.button-container').click()

    cy.get('input').type('Meu primeiro anuncio')
    cy.get('textarea').type('Casa com varias coisas legais')
    cy.get('.button-container').click()

    cy.get(':nth-child(2) > .input-container > input').type('Rua teste')
    cy.get(':nth-child(3) > .input-container > input').type('Bairro teste')
    cy.get(':nth-child(4) > .input-container > input').type('Cidade teste')
    cy.get('.steps-action > :nth-child(2)').click()

    cy.get(':nth-child(3) > .input-container > input').type('3')
    cy.get(':nth-child(4) > .input-container > input').type('2')
    cy.get(':nth-child(5) > .input-container > input').type('500')
    cy.get(':nth-child(6) > .input-container > input').type('3')
    cy.get('.steps-action > :nth-child(2)').click()

    cy.get('.steps-action > :nth-child(2)').click()

    cy.intercept(
      {
        method: 'POST',
        url: '/user/property'
      },
      { fixture: 'locus.json' }
    )

    cy.get('input').type('1500.00')
    cy.get('.steps-action > :nth-child(2)').click()

    cy.url().should('include', '/advertise')
  })
})

function handleLogin() {
  cy.get('.dropdown-toggle > #icon > path').click()
  cy.get('.menu-not-signed > a').click()
  cy.get(':nth-child(2) > .input-container > input').type('vanessa@locus.com')
  cy.get(':nth-child(3) > .input-container > input').type('12345678')
  cy.get('.button-container').click()
}
