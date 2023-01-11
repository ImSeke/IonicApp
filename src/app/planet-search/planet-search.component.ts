import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { PlanetService } from '../services/planet.service';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

@Component({
  selector: 'app-planet-search',
  templateUrl: './planet-search.component.html',
  styleUrls: ['./planet-search.component.css']
})
export class PlanetSearchComponent {
  public columndefs: any[] = ['name', 'climate'];
  planets$!: Observable<any>;
  private searchTerms = new Subject<string>();

  constructor(private planetService: PlanetService) {}

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.planets$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.planetService.searchPlanets(term)),
    );
  }
}
