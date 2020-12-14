import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserCredentials } from '../models/user-credentials.model';
import { User } from '../models/user.model';
import { map, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AccountService {

  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>; 

  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }

  login(userCredentials: UserCredentials): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/account/login`, userCredentials)
      .pipe(map(user => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
        }
        return user;
      }));
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/account/register`, user);
  }
}
