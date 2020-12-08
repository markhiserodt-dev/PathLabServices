import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Test } from '../models/test.model'
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { SearchResponse } from '../models/search-response.model';
import { SearchRequest } from '../models/search-request.model';

@Injectable({ providedIn: 'root' })
export class TestsService {

  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getTests(): Observable<Test[]> {
    return this.http.get<Test[]>(`${this.apiUrl}/tests`);
  }

  getTest(id: number): Observable<Test> {
    return this.http.get<Test>(`${this.apiUrl}/tests/${id}`);
  }

  searchTests(req: SearchRequest): Observable<SearchResponse> {
    return this.http.post<SearchResponse>(`${this.apiUrl}/tests/search`, req);
  }

  addTest(test: Test): Observable<Test> {
    return this.http.post<Test>(`${this.apiUrl}/tests/add`, test);
  }

  editTest(test: Test): Observable<Test> {
    return this.http.post<Test>(`${this.apiUrl}/tests/edit`, test);
  }
  
}
