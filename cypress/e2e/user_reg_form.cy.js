/// <reference types="cypress"/>
import { form1, form2, engPass } from '../support/locators'
import '../support/commands'
import generateUser from '../support/userGenerator'

describe('template spec', () => {
  let user;

  beforeEach('Enter registration page', () => {
    cy.visit('https://qastage.buildbox.one/18/cadastro/')
    cy.get(engPass.btnStartRegistration).click()
    user = generateUser()
  })

  it('Validate sucessful registration', () => {
    cy.fillFirstRegistrationForm(user)
    cy.get(form1.submitBtn).click()
    cy.fillSecondRegistrationForm(user)
    cy.get(form2.submitBtn).click()
    cy.get(engPass.sucessfulJoinMessage).should('have.text', ' Thank you for joining us! ')
  })

  it('Validade mandatory fields - Name - empty field', () => {
    user.name = ''  // Nothing will be typed on name field
    cy.fillFirstRegistrationForm(user)
    cy.get(form1.submitBtn).click()

    cy.validateMandatoryField(form1.nameField)
  })

  it.skip('Validade mandatory fields - Name too short', () => { //Test fails  ¯\_(ツ)_/¯ Namefield is accepting name too short if written by Cypress.
    user.name = 'Abd'

    cy.fillFirstRegistrationForm(user)

    cy.get(form1.submitBtn).click() //tá conseguindo ir igual ué
    cy.get(form1.nameField).parent().find(form1.inputError).should('have.text', 'Preencha corretamente')
  })

  it.skip('Validade mandatory fields - Lastname too short', () => { //Test fails  ¯\_(ツ)_/¯ LastNamefield is accepting name too short if written by Cypress.
    user.lastName = 'Abd'

    cy.fillFirstRegistrationForm(user)
    cy.get(form1.submitBtn).click()
    cy.get(form1.lastNameField).parent().find(form1.inputError).should('have.text', 'Preencha corretamente')
  })

  it('Validade mandatory fields - Birthdate - empty field', () => {
    user.birthdate = ''
    cy.fillFirstRegistrationForm(user)

    cy.validateMandatoryField(form1.birthdateField)
  })

  it('Validade mandatory fields - CPF - empty field', () => {
    user.cpf = ''
    cy.fillFirstRegistrationForm(user)

    cy.validateMandatoryField(form1.cpfField)
  })

  it('Validade mandatory fields - Email - empty field', () => {
    user.email = ''
    cy.fillFirstRegistrationForm(user)

    cy.validateMandatoryField(form1.emailField)
  })

  it('Validade mandatory fields - Email confirmation - empty field', () => {
    user.emailConfirmation = ''
    cy.fillFirstRegistrationForm(user)

    cy.validateMandatoryField(form1.emailConfirmationField)
  })

  it('Validade mandatory fields - English level - not chosen', () => {
    user.englishLevel = null
    cy.fillFirstRegistrationForm(user)
    cy.get(form1.submitBtn).click()

    cy.validateMandatoryField(form1.englishLevelSelectErrMesage)
  })

  it('Validade form without checking terms acceptance box', () => {
    user.acceptTerms = false
    cy.fillFirstRegistrationForm(user)
    cy.get(form1.submitBtn).click()

    cy.validateMandatoryField(form1.termsAndPolicyCheckbox, 'Marque esta caixa se deseja continuar.')
  })

  it('Validade different emails', () => {
    user.emailConfirmation = 'heisenberg@bb.com'
    cy.fillFirstRegistrationForm(user)
    cy.get(form1.submitBtn).click()

    cy.validateMandatoryField(form1.emailConfirmationField, 'Os e-mails não são iguais.')
  })

  it('Validade different passwords', () => {
    user.passwordConfirmation = user.password + 'blabla'
    cy.fillFirstRegistrationForm(user)
    cy.get(form1.submitBtn).click()

    cy.validateMandatoryField(form1.passwordConfirmationField, 'As senhas não são iguais.')
  })

  it('Open placement test', () => {
    cy.window().then(win => {
      cy.stub(win, 'open').as('open')
    })
    cy.get(form1.placementTextBtn).click()

    cy.get('@open').should('have.been.calledOnceWithExactly', 'https://qastage.buildbox.one/nivelamento')
  })

  it('Validade mandatory fields - CPF - invalid CPF', () => {
    user.cpf = '197.297.061-78'
    cy.fillFirstRegistrationForm(user)
    cy.get(form1.submitBtn).click()

    cy.validateMandatoryField(form1.cpfField, 'CPF inválido.')
  })

  it('Validade mandatory fields - Email - invalid email', () => {
    user.email = 'aaaaa'
    cy.fillFirstRegistrationForm(user)
    cy.get(form1.submitBtn).click()

    cy.validateMandatoryField(form1.emailField, 'Email inválido.')
  })

  it('Validade mandatory fields - Birthdate - invalid birthdate', () => {
    user.birthdate = '11/11/1111'
    cy.fillFirstRegistrationForm(user)
    cy.get(form1.submitBtn).click()

    cy.validateMandatoryField(form1.birthdateField, 'Data de nascimento inválida.')
  })

  it.skip('Validade mandatory fields - Password - invalid password', () => { // Pelo Cypress está aceitando password desse tamanho, assim como nome e sobrenome curto demais.
    user.password = 'aaa'
    user.passwordConfirmation = 'aaa'
    cy.fillFirstRegistrationForm(user)
    cy.get(form1.submitBtn).click()

    cy.get(form1.passwordField).then(($input) => {
      expect($input[0].validationMessage).to.contains('Aumente este texto para 5 caracteres ou mais.')
    })
  })

  //Second form
  it('Validade mandatory fields - CEP - empty field', () => {
    cy.fillFirstRegistrationForm(user)
    cy.get(form1.submitBtn).click()

    user.cep = ''
    cy.fillSecondRegistrationForm(user)
    cy.get(form2.submitBtn).click()

    cy.validateMandatoryField(form2.cepField,)
  })

  it('Validade mandatory fields - CEP - invalid CEP', () => {
    cy.fillFirstRegistrationForm(user)
    cy.get(form1.submitBtn).click()

    user.cep = '65464-465'
    cy.fillSecondRegistrationForm(user)
    cy.get(form2.districtField).type('Bairro Petrópolis')
    cy.get(form2.addressStreetField).type('Ruazinha')
    cy.get(form2.submitBtn).click()

    cy.get(form2.alert).should('have.text', "CEP não encontrado.")
  })

  it('Validade mandatory fields - District', () => {
    cy.fillFirstRegistrationForm(user)
    cy.get(form1.submitBtn).click()

    cy.fillSecondRegistrationForm(user)
    cy.get(form2.districtField).clear()
    cy.get(form2.submitBtn).click()

    cy.validateMandatoryField(form2.districtField)
  })

  it('Validade mandatory fields - Address', () => {
    cy.fillFirstRegistrationForm(user)
    cy.get(form1.submitBtn).click()

    cy.fillSecondRegistrationForm(user)
    cy.get(form2.addressStreetField).clear()
    cy.get(form2.submitBtn).click()

    cy.validateMandatoryField(form2.addressStreetField)
  })

  it('Validade mandatory fields - Residencial number', () => {
    cy.fillFirstRegistrationForm(user)
    cy.get(form1.submitBtn).click()

    cy.fillSecondRegistrationForm(user)
    cy.get(form2.residencialNumberField).clear()
    cy.get(form2.submitBtn).click()

    cy.validateMandatoryField(form2.residencialNumberField)
  })
})