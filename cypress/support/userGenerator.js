import CpfGenerator from "./GeradorCpf"
import { fa, faker } from "@faker-js/faker"

function generateUser() {
    const cpfGen = new CpfGenerator()
    const email = faker.internet.email()
    const password = faker.internet.password()

    const user = {
        name: faker.person.firstName(),
        lastName: faker.person.lastName(),
        birthdate: '01/12/1990',
        cpf: cpfGen.generateCpf(),
        email: email,
        emailConfirmation: email,
        password: password,
        passwordConfirmation: password,
        englishLevel: 'Advanced',
        cep: '99010-000',
        residencialNumber: faker.number.int(1000),
        adressComplement: 'Next to Pollos Hermanos',
        acceptTerms: true
    }

    return user
}

export default generateUser