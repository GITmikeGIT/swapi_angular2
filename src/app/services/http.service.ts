import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {}

  get(url: string): Observable<any> {
    return from(this.http.get(url));
  }

}