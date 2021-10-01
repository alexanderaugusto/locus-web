/* eslint-disable no-undef */
/// <reference types="cypress"/>

describe('Caso de Teste: Testar funcionalidades da tela inicial do Locus', () => {
  beforeEach(() => {
    cy.visit('https://locus-app.vercel.app')
  })

  it('Cenario: Entrar no site do Locus', () => {
    cy.get('h1').should('contain.text', 'Encontre o imóvel ideal para você!')
  })

  it('Cenario: Navegar até a tela de Detalhes do primeiro imóvel', () => {
    cy.get(':nth-child(1) > .info-container > .more-details').click()

    cy.url().should('include', '/advertise')
    cy.get('.address').should(
      'contain.text',
      'Av. João de Camargo, Centro - Santa Rita do Sapucaí (MG)'
    )
  })

  it('Cenario: Navegar até a tela de Detalhes do primeiro imóvel e entrar em contato com dono do imóvel', () => {
    handleLogin()

    cy.get(':nth-child(1) > .info-container > .more-details').click()

    cy.intercept(
      {
        method: 'POST',
        url: '/user/property/**/owner/contact'
      },
      {}
    )

    cy.get('textarea').type('Olá, gostaria de alugar esse imóvel...')
    cy.get('.button-container').click()

    cy.get('h1').should('contain.text', 'Deu tudo certo :D')
  })
})

function handleLogin() {
  cy.get('.dropdown-toggle > #icon > path').click()
  cy.get('.menu-not-signed > a').click()
  cy.get(':nth-child(2) > .input-container > input').type('vanessa@locus.com')
  cy.get(':nth-child(3) > .input-container > input').type('12345678')
  cy.get('.button-container').click()
}
