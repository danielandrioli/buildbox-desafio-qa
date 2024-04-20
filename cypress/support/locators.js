const firstPageForm = {
    nameField: '#signup-personal-data-firstName',
    lastNameField: '#signup-personal-data-lastName',
    birthdateField: '#signup-personal-data-birthDate',
    cpfField: '#signup-personal-data-cpf',
    emailField: '#signup-personal-data-email',
    emailConfirmationField: '#signup-personal-data-email-confirm',
    passwordField: '#signup-personal-data-password',
    passwordConfirmationField: '#signup-personal-data-password-confirm',
    englishLevelSelect: '.bx-select-advanced.flex.flex-col.form-container.justify-center', // There's 2. Use contains!
    englishLevelSelectErrMesage: "input[name='signup-personal-english-level']", // A msg de erro aparece aqui ao invés no elemento de cima
    termsAndPolicyCheckbox: '#signup-personal-data-lgpd',
    submitBtn: '#signup_submit_button_1',
    inputError: '.input-error',
    placementTextBtn: '.btn.btn-secondary.cursor-pointer.w-full'
}

const secondPageForm = {
    submitBtn: '#signup_submit_button_3',
    cepField: '#signup-address-cep',
    districtField: '#signup-address-neighborhood',
    addressStreetField: '#signup-address-street',
    residencialNumberField: '#signup-address-number',
    adressComplementField: '#signup-address-complement',
    alert: "[class='toast toast-success toast-number-0']"
}

const englishPass = {
    btnStartRegistration: 'button#btn-enroll',
    sucessfulJoinMessage: '.bg-thankyou h1'
}

export {firstPageForm as form1, secondPageForm as form2, englishPass as engPass}