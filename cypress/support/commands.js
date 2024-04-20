// import loc from '../support/locators'
import { fa, faker } from "@faker-js/faker"
import { form1, form2 } from "../support/locators"

Cypress.Commands.overwrite('type', (originalFn, subject, str, options) => {  // Now it's possible to type ''
    if (str !== '') {
        return originalFn(subject, str, options)
    }
    return subject
})

Cypress.Commands.add('fillFirstRegistrationForm', (user) => {
    cy.get(form1.nameField).type(user.name)
    cy.get(form1.lastNameField).type(user.lastName)
    cy.get(form1.birthdateField).type(user.birthdate)
    cy.get(form1.cpfField).type(user.cpf)
    cy.get(form1.emailField).type(user.email)
    cy.get(form1.emailConfirmationField).type(user.emailConfirmation)
    cy.get(form1.passwordField).type(user.password)
    cy.get(form1.passwordConfirmationField).type(user.passwordConfirmation)
    cy.get(form1.englishLevelSelect).contains('Selecione').click()
    user.englishLevel ? cy.get(form1.englishLevelSelect).contains(user.englishLevel).click() : cy.get(form1.englishLevelSelect).contains('Selecione').click()
    user.acceptTerms ? cy.get(form1.termsAndPolicyCheckbox).check() : ''
})

Cypress.Commands.add('validateMandatoryField', (fieldSelector, message = 'Preencha este campo.') => {
    cy.get(fieldSelector).then(($input) => {
        expect($input[0].validationMessage).to.eq(message)
      })
})
Cypress.Commands.add('fillSecondRegistrationForm', (user) => {
    cy.get(form2.cepField).type(user.cep)
    cy.get(form2.residencialNumberField).type(user.residencialNumber)
    cy.get(form2.adressComplementField).type(user.adressComplement)
})

