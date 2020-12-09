import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { PasswordValidator } from '../shared/password-validator.directive';
import { PasswordMatchValidator } from '../shared/password-match-validator.directive';
import { AccountService } from '../services/account.service';
import { User } from '../models/user.model';
import { take } from 'rxjs/operators';
import { BaseComponent } from '../shared/base-component';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent extends BaseComponent implements OnInit {

  registrationForm: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),

    lastName: new FormControl('', Validators.required),

    email: new FormControl('', [ Validators.required,
                                 Validators.email ]),

    password: new FormControl('', [ Validators.required, 
                                    Validators.minLength(8), 
                                    PasswordValidator() ]),

    passwordMatch: new FormControl('', [ PasswordMatchValidator() ])
  });

  hide: boolean = true;
  showPasswordHint: boolean = false;

  constructor(private accountService: AccountService) {
    super();
  }

  ngOnInit() {

  }

  onSubmit() {
    const user: User = {
      firstName: this.registrationForm.get('firstName').value,
      lastName: this.registrationForm.get('lastName').value,
      email: this.registrationForm.get('email').value,
      password: this.registrationForm.get('password').value,
      isAdmin: false,
    }
    this.accountService.register(user).pipe(take(1)).subscribe((user: User) => {
      this.resetForm(this.registrationForm);
    });
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

}