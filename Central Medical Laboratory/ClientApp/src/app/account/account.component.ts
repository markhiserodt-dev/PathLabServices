import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core'
import { Subscription } from 'rxjs'
import { AccountService } from '../services/account.service';
import { User } from '../models/user.model';
import { UserCredentials } from '../models/user-credentials.model';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit, OnDestroy {

  userCredentials: UserCredentials = {
    email: '',
    password: ''
  };

  passwordHidden: boolean = true;

  @Input() user: User;
  @Output() userEvent = new EventEmitter<User>();
  @Output() closeEvent = new EventEmitter<Boolean>();

  private accountService$: Subscription;

  constructor(private accountService: AccountService) {}

  ngOnInit() {
  }

  login() {
    this.accountService$ = this.accountService.login(this.userCredentials).pipe(take(1)).subscribe((user: User) => {
      if (user) {
        this.user = user;
        this.userEvent.emit(user);
      }
    });
  }

  logout() {
    this.user = undefined;
    this.userCredentials.email = '';
    this.userCredentials.password = '';
    this.userEvent.emit(undefined);
  }

  register() {

  }

  ngOnDestroy() {
  }
}