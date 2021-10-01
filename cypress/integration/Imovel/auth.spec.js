/* eslint-disable no-undef */
/// <reference types="cypress"/>

describe('Caso de Teste: Testar funcionalidades de autenticação do site Locus', () => {
  it('Cenario: Cadastrar um novo usuário com sucesso', () => {
    cy.visit('https://locus-app.vercel.app/signup')

    cy.get(':nth-child(1) > .input-container > input').type('Alexander Augusto')
    cy.get(':nth-child(2) > .input-container > input').type('111.111.111-00')
    cy.get(':nth-child(3) > .input-container > input').type('(35) 9999-9999')
    cy.get('.button-container').click()

    cy.get(':nth-child(1) > .input-container > input').type(
      'alexaasf1010@gmail.com'
    )
    cy.get(':nth-child(2) > .input-container > input').type(
      'alexaasf1010@gmail.com'
    )
    cy.get('.steps-action > :nth-child(2)').click()

    cy.get(':nth-child(2) > .input-container > input').type('12345678')
    cy.get(':nth-child(3) > .input-container > input').type('12345678')
    cy.get('.steps-action > :nth-child(2)').click()

    cy.intercept(
      {
        method: 'POST',
        url: '/user'
      },
      { fixture: 'user.json' }
    )

    cy.get('.steps-action > :nth-child(2)').click()

    cy.url().should('include', '/login')
  })

  it('Cenario: Falha ao tentar cadastrar um novo usuário com dados inválidos', () => {
    cy.visit('https://locus-app.vercel.app/signup')

    cy.get(':nth-child(1) > .input-container > input').type('Alexander Augusto')
    cy.get(':nth-child(2) > .input-container > input').type('111.111.111-00')
    cy.get(':nth-child(3) > .input-container > input').type('(35) 9999-9999')
    cy.get('.button-container').click()

    cy.get(':nth-child(1) > .input-container > input').type(
      'alexaasf1010@gmail.com'
    )
    cy.get(':nth-child(2) > .input-container > input').type(
      'alexaasf1010@gmail.com'
    )
    cy.get('.steps-action > :nth-child(2)').click()

    cy.get('.steps-action > :nth-child(2)').click()

    cy.get('.steps-action > :nth-child(2)').click()

    cy.get('h1').should('contain.text', 'Algo deu errado :(')
  })

  it('Cenario: Realizar login no site com sucesso', () => {
    cy.visit('https://locus-app.vercel.app/login')

    cy.get(':nth-child(2) > .input-container > input').type(
      'alexaasf_10@hotmail.com'
    )
    cy.get(':nth-child(3) > .input-container > input').type('123')
    cy.get('.button-container').click()

    cy.get('h1').should('contain.text', 'Encontre o imóvel ideal para você!')
  })

  it('Cenario: Falha ao tentar realizar o login com dados inválidos', () => {
    cy.visit('https://locus-app.vercel.app/login')

    cy.get(':nth-child(2) > .input-container > input').type(
      'alexaasf_10@hotmail.com'
    )
    cy.get(':nth-child(3) > .input-container > input').type('123456')
    cy.get('.button-container').click()

    cy.get('h1').should('contain.text', 'Algo deu errado :(')
  })
})
