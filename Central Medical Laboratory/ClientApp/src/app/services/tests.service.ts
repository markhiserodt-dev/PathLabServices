import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Test } from '../models/test.model'
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TestsService {

  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getTests() {
    return this.http.get<Test[]>(`${this.apiUrl}/tests`);
  }
}