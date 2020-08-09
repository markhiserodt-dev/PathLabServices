import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserCredentials } from '../models/user-credentials';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AccountService {

  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(userCredentials: UserCredentials): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/account/login`, userCredentials);
  }
}
