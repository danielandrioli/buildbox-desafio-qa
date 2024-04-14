// import loc from '../support/locators'
import { fa, faker } from "@faker-js/faker"
import { form1, form2 } from "../support/locators"
import CpfGenerator from "./GeradorCpf"

Cypress.Commands.add('fillFirstRegistrationFormWithDummyInfo', () => {
    const email = faker.internet.email()
    const password = faker.internet.password()
    const cpfGen = new CpfGenerator()

    cy.get(form1.nameField).type(faker.person.firstName())
    cy.get(form1.lastNameField).type(faker.person.lastName())
    cy.get(form1.birthdateField).type('01/12/1990')
    cy.get(form1.cpfField).type(cpfGen.generateCpf())
    cy.get(form1.emailField).type(email)
    cy.get(form1.emailConfirmationField).type(email)
    cy.get(form1.passwordField).type(password)
    cy.get(form1.passwordConfirmationField).type(password)
    cy.get(form1.englishLevelSelect).contains('Selecione').click()
    cy.get(form1.englishLevelSelect).contains('Advanced').click()
    cy.get(form1.termsAndPolicyCheckbox).check()
})

Cypress.Commands.add('fillSecondRegistrationFormWithDummyInfo', () => {
    cy.get(form2.cepField).type('99010-000')
    cy.get(form2.residencialNumberField).type(faker.number.int(1000))
    cy.get(form2.adressComplementField).type("Next to Pollos Hermanos")

    user.name ? cy.get(form2.adressComplementField).type(user.name) : ''
    null 
})


  

// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })