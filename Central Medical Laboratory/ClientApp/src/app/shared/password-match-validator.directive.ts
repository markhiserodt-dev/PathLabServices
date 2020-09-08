import { AbstractControl, ValidatorFn } from "@angular/forms";

export function PasswordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: boolean} | null => {

    if (!control || !control.parent) {
      return null;
    }
    const original = control.parent.controls['password'].value;
    const duplicate = control.value;

    if (duplicate !== original) {
      return { 'mismatch': true }
    } else {
      return null;
    }
  }
}