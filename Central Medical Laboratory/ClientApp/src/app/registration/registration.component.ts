import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { PasswordValidator } from '../shared/password-validator.directive';
import { PasswordMatchValidator } from '../shared/password-match-validator.directive';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {

  registrationForm: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),

    lastName: new FormControl('', Validators.required),

    email: new FormControl('', [ Validators.required,
                                 Validators.email ]),

    password: new FormControl('', [ Validators.required, 
                                    Validators.minLength(8), 
                                    PasswordValidator(),]),

    passwordMatch: new FormControl('', [ PasswordMatchValidator() ])
  });

  hide: boolean = true;
  showPasswordHint: boolean = false;


  constructor() {}

  ngOnInit() {

  }

  onSubmit() {
  }

  getEmailErrorMessage(): string {
    let emailForm: AbstractControl = this.registrationForm.controls['email'];
    if (emailForm.hasError('required')) {
      return 'Email is required';
    } else if (emailForm.hasError('email')) {
      return 'Invalid email';
    } else {
      return '';
    }
  }

  getPasswordErrorMessage(): string {
    let passwordForm: AbstractControl = this.registrationForm.controls['password'];
    if (passwordForm.hasError('minlength')) {
      return 'Must be at least 8 characters';
    } else if (passwordForm.hasError('upperCaseError')) {
      return 'Requires an uppercase letter';
    } else if (passwordForm.hasError('lowerCaseError')) {
      return 'Requires a lowercase letter';
    } else if (passwordForm.hasError('numberError')) {
      return 'Requires a number';
    } else if (passwordForm.hasError('specialCharError')){
      return 'Requires a special character';
    } else {
      return '';
    }
  }

  getPasswordMatchErrorMessage(): string {
    let passwordMatchForm: AbstractControl = this.registrationForm.controls['passwordMatch'];
    if (passwordMatchForm.hasError('mismatch')) {
      return 'Passwords must match';
    } else {
      return '';
    }
  }

  ngOnDestroy() {

  }
}