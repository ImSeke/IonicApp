import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';

import { Planet } from '../models/planet';

@Injectable({
  providedIn: 'root'
})
export class PlanetService {
  private planetsUrl = 'https://swapi.dev/api/planets' ;
  planets: Array<any> = [];
  count : Number = 0;
  result: any


  constructor(
    private http: HttpClient) { }

  getPlanets(): Observable<any> {    
    return this.http.get<any>(this.planetsUrl)
  }

  getNextPlanets(url:string): Observable<any> {
    return this.http.get<any>(url) ;
  }

  searchPlanets(p:string): Observable<any> {
    if (!p.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<any>(`${this.planetsUrl}/?search=${p}`)
  }
}
