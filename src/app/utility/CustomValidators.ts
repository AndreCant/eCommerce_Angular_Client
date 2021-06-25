import { AbstractControl } from "@angular/forms";

export class CustomValidators {

   static validatePassword(control: AbstractControl) {
        let password = control.value;
        const PASSWORD_REGEXP = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
        const error = !PASSWORD_REGEXP.test(password);

        return error ? { 'passwordFormatError': { valid: false, value: password } } : null;
    }

    static validatePostalCode(control: AbstractControl) {
        let postalCode = control.value;
        const POSTAL_CODE_REGEXP = /^\b\d{5}\b/;
        const error = !POSTAL_CODE_REGEXP.test(postalCode);

        return error ? { 'postalCodeFormatError': { valid: false, value: postalCode } } : null;
    }

    static validatePhone(control: AbstractControl) {
        let phone = control.value;
        const PHONE_REGEXP = /^\b\d{10}\b/;
        const error = !PHONE_REGEXP.test(phone);

        return error ? { 'phoneFormatError': { valid: false, value: phone } } : null;
    }
}
