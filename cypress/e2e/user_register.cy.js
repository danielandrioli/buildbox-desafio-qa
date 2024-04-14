/// <reference types="cypress"/>
import { form1, form2, engPass } from '../support/locators'
import '../support/commands'

describe('template spec', () => {
  beforeEach('Enter registration page', () => {
    cy.visit('https://qastage.buildbox.one/18/cadastro/')
    cy.get(engPass.btnStartRegistration).click()
  })

  it('Validate sucessful registration', () => {
    cy.fillFirstRegistrationFormWithDummyInfo()
    cy.get(form1.submitBtn).click()
    cy.fillSecondRegistrationFormWithDummyInfo()
    cy.get(form2.submitBtn).click()
    cy.get(engPass.sucessfulJoinMessage).should('have.text', ' Thank you for joining us! ')
  })

  it('Validade mandatory fields - Name - empty field', () => {
    cy.fillFirstRegistrationFormWithDummyInfo()
    cy.get(form1.nameField).clear()
    cy.get(form1.submitBtn).click()

    cy.get(form1.nameField).parent().find(form1.inputError).should('have.text', 'Precisa ser preenchido')
  })
  
  it('Validade mandatory fields - Name too short', () => { //Test fails. Not my fault  ¯\_(ツ)_/¯ Namefield is accepting name too short if written by Cypress.
    cy.fillFirstRegistrationFormWithDummyInfo()
    cy.get(form1.nameField).clear()
    cy.get(form1.nameField).type('Ab')

    cy.get(form1.submitBtn).click() //tá conseguindo ir igual ué
    cy.get(form1.nameField).parent().find(form1.inputError).should('have.text', 'Preencha corretamente')
  })

  it('Validade mandatory fields - Lastname too short', () => { //Test fails. Not my fault  ¯\_(ツ)_/¯ LastNamefield is accepting name too short if written by Cypress.
    cy.fillFirstRegistrationFormWithDummyInfo()
    cy.get(form1.lastNameField).clear()
    cy.get(form1.lastNameField).type('Ab')

    cy.get(form1.submitBtn).click()
    cy.get(form1.lastNameField).parent().find(form1.inputError).should('have.text', 'Preencha corretamente')
  })

  it('Validade mandatory fields - Birthdate - empty field', () => {
    cy.fillFirstRegistrationFormWithDummyInfo()
    cy.get(form1.birthdateField).clear()
    cy.get(form1.submitBtn).click()

    cy.get(form1.birthdateField).parent().find(form1.inputError).should('have.text', 'Data de nascimento inválida.')
  })

  it('Validade mandatory fields - CPF - empty field', () => {
    cy.fillFirstRegistrationFormWithDummyInfo()
    cy.get(form1.cpfField).clear()
    cy.get(form1.submitBtn).click()

    cy.get(form1.cpfField).parent().find(form1.inputError).should('have.text', 'CPF inválido.')
  })

  it('Validade mandatory fields - Email - empty field', () => {
    cy.fillFirstRegistrationFormWithDummyInfo()
    cy.get(form1.emailField).clear()
    cy.get(form1.submitBtn).click()

    cy.get(form1.emailField).parent().find(form1.inputError).should('have.text', 'Precisa ser preenchido')
  })

  it('Validade mandatory fields - Email confirmation - empty field', () => {
    cy.fillFirstRegistrationFormWithDummyInfo()
    cy.get(form1.emailConfirmationField).clear()
    cy.get(form1.submitBtn).click()

    cy.get(form1.emailConfirmationField).parent().find(form1.inputError).should('have.text', 'Precisa ser preenchido')
  })

  it.skip('Validade mandatory fields - English level - empty field', () => {
    cy.fillFirstRegistrationFormWithDummyInfo()
    // cy.get(form1.submitBtn).click()


  })

})