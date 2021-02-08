import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { AccountService } from '../services/account.service';
import { User } from '../models/user.model';
import { UserCredentials } from '../models/user-credentials.model';
import { take, takeUntil } from 'rxjs/operators';
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
  user: User;

  @Output() closeEvent = new EventEmitter<Boolean>();

  constructor(private accountService: AccountService) {
    super();
  }

  ngOnInit() {
    this.accountService.user.pipe(takeUntil(this.ngUnsubscribe)).subscribe((user: User) => {
      this.user = user;
    });
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
          this.closeAccountModal();
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
    this.resetForm(this.loginForm);
    this.accountService.logout();
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