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

    static validateCardNumber(control: AbstractControl) {
        let number = control.value;
        const NUMBER_REGEXP = /^\b\d{16}\b/;
        const error = !NUMBER_REGEXP.test(number);

        return error ? { 'cardNumberFormatError': { valid: false, value: number } } : null;
    }

    static validateYear(control: AbstractControl) {
        let year = control.value;
        const YEAR_REGEXP = /^\b\d{4}\b/;
        const error = !YEAR_REGEXP.test(year);

        return error ? { 'yearFormatError': { valid: false, value: year } } : null;
    }

    static validateMonth(control: AbstractControl) {
        let month = control.value;
        const MONTH_REGEXP = /^\b\d{2}\b/;
        const error = !MONTH_REGEXP.test(month);

        return error ? { 'monthFormatError': { valid: false, value: month } } : null;
    }

    static validateCvv(control: AbstractControl) {
        let cvv = control.value;
        const CVV_REGEXP = /^\b\d{3}\b/;
        const error = !CVV_REGEXP.test(cvv);

        return error ? { 'cvvFormatError': { valid: false, value: cvv } } : null;
    }
}
