import { AbstractControl } from "@angular/forms";

export class CustomValidators {

   static validatePassword(control: AbstractControl) {
        let password = control.value;
        const PASSWORD_REGEXP = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
        const error = !PASSWORD_REGEXP.test(password);

        return error ? { 'passwordFormatError': { valid: false, value: password } } : null;
    }
}
