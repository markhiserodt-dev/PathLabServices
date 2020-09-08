import { AbstractControl, ValidatorFn } from "@angular/forms";

export function PasswordValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: boolean} | null => {
    const password = control.value;

    const upperCaseCharacters = /[A-Z]+/g;
    const lowerCaseCharacters = /[a-z]+/g;
    const numberCharacters = /[0-9]+/g;
    const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    if (upperCaseCharacters.test(password) === false) {
      return { 'upperCaseError': true }
    } else if (lowerCaseCharacters.test(password) === false) {
      return { 'lowerCaseError': true };
    } else if (numberCharacters.test(password) === false) {
      return { 'numberError': true };
    } else if (specialCharacters.test(password) === false) {
      return { 'specialCharError': true };
    } else {
      return null;
    }
  }
}