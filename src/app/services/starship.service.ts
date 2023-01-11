import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Starship } from '../models/starship';

@Injectable({
  providedIn: 'root'
})
export class StarshipService {

  private starshipsUrl = 'https://swapi.dev/api/starships' ;

  constructor(
    private http: HttpClient) { }

  getStarships(): Observable<any> {
    return this.http.get<any>(this.starshipsUrl)
  }
}
