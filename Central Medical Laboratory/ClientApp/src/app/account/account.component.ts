import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { AccountService } from '../services/account.service';
import { User } from '../models/user.model';
import { UserCredentials } from '../models/user-credentials.model';
import { take } from 'rxjs/operators';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from '../shared/base-component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent extends BaseComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [ Validators.required,
                                 Validators.email ]),

    password: new FormControl('', Validators.required )
  });

  passwordHidden: boolean = true;
  loginErrorMessage: string = '';

  @Input() user: User;
  @Output() userEvent = new EventEmitter<User>();
  @Output() closeEvent = new EventEmitter<Boolean>();

  constructor(private accountService: AccountService) {
    super();
  }

  ngOnInit() {
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }
    const userCredentials: UserCredentials = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    }
    this.accountService.login(userCredentials).pipe(take(1)).subscribe(
      (user: User) => {
        if (user) {
          this.user = user;
          this.userEvent.emit(user);
        }
      },
      (error: HttpErrorResponse) => {
        if (error.status == 401) {
          this.loginErrorMessage = 'Invalid username or password';
        }
      }
    );
  }

  logout() {
    this.user = undefined;
    this.loginForm.get('email').setValue('')
    this.loginForm.get('email').setErrors(null),
    this.loginForm.get('password').setValue('');
    this.loginForm.get('password').setErrors(null),
    this.userEvent.emit(undefined);
  }

  clearEmail() {
    this.loginForm.get('email').setValue('');
    this.loginForm.get('email').setErrors(null);
  }

  closeAccountModal() {
    this.closeEvent.emit(true);
  }

  getEmailErrorMessage(): string {
    let emailForm: AbstractControl = this.loginForm.controls['email'];
    if (emailForm.hasError('required')) {
      return 'Email is required to sign in';
    } else if (emailForm.hasError('email')) {
      return 'Please provide a valid email';
    } else {
      return '';
    }
  }
  
}