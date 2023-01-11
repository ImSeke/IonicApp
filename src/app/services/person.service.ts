import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Person } from '../models/person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private peopleUrl = 'https://swapi.dev/api/people' ;

  constructor(
    private http: HttpClient) { }

  getPeople(): Observable<any> {
    return this.http.get<any>(this.peopleUrl)
  }
}
