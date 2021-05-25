/* eslint-disable no-undef */
/// <reference types="cypress"/>

describe('Caso de Teste: 1', () => {
  beforeEach(() => {
    cy.visit('https://imovel-web.vercel.app')
  })

  it('Cenario: Entrar no site do IMOVEL', () => {
    cy.get('h1').should('contain.text', 'Encontre o imóvel ideal para você!')
  })

  it('Cenario: Navegar até a tela de Detalhes do primeiro imóvel e verificar o título', () => {
    cy.get(':nth-child(1) > .info-container > .more-details').click()
    cy.get('.title').should(
      'contain.text',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
    )
  })

  it('Cenario: Navegar até a tela de login e ao entrar com dados inválidos, não realizar o login', () => {
    cy.get('.dropdown-toggle > #icon > path').click()
    cy.get('.menu-not-signed > a').click()
    cy.get(':nth-child(2) > .input-container > input').type('user@imovel.com')
    cy.get(':nth-child(3) > .input-container > input').type('12345678')
    cy.get('.button-container').click()

    cy.get('h1').should('contain.text', 'Algo deu errado :(')
  })

  it('Cenario: Navegar até a tela de login e realizar o login na aplicação', () => {
    cy.get('.dropdown-toggle > #icon > path').click()
    cy.get('.menu-not-signed > a').click()
    cy.get(':nth-child(2) > .input-container > input').type(
      'vanessa@imovel.com'
    )
    cy.get(':nth-child(3) > .input-container > input').type('12345678')
    cy.get('.button-container').click()

    cy.get('.dropdown-toggle > img').click()
    cy.get('.user-info > div > p').should('contain.text', 'Vanessa')
  })

  it('Cenario: Realizar login e navegar até a tela Minha Conta e alterar o nome do usuário', () => {
    cy.get('.dropdown-toggle > #icon > path').click()
    cy.get('.menu-not-signed > a').click()
    cy.get(':nth-child(2) > .input-container > input').type(
      'vanessa@imovel.com'
    )
    cy.get(':nth-child(3) > .input-container > input').type('12345678')
    cy.get('.button-container').click()

    cy.get('.dropdown-toggle > img').click()
    cy.get('ul > :nth-child(1) > a').click()

    cy.get(':nth-child(1) > .input-container > input')
      .focus()
      .clear()
      .type('Vanessa')
    cy.get('form > .button-container').click()

    cy.get('.user-info > p').should('contain.text', 'Vanessa')
  })

  it('Cenario: Realizar Login, navegar ate a Tela Anunciar e entrar na tela de Cadastro de Imóveis', () => {
    cy.get('.dropdown-toggle > #icon > path').click()
    cy.get('.menu-not-signed > a').click()
    cy.get(':nth-child(2) > .input-container > input').type(
      'vanessa@imovel.com'
    )
    cy.get(':nth-child(3) > .input-container > input').type('12345678')
    cy.get('.button-container').click()

    cy.get('.dropdown-toggle > img').click()
    cy.get('ul > :nth-child(3) > a').click()
    cy.get('.title > h1').contains('Anunciar')

    cy.get('.button-container').click()
    cy.get('h1').should('contain.text', 'É rápido, simples e gratuito!')
  })
})
