import { Component } from '@angular/core';
import { PlanetService } from '../services/planet.service';
import { Planet } from '../models/planet';
import { Observable, Observer } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.css']
})
export class PlanetsComponent {
  public planets: Observable<any> = this.planetService.getPlanets();
  public columndefs: any[] = ['name', 'climate'];

  constructor(private planetService: PlanetService) { }

  ngOnInit(): void { }
}
