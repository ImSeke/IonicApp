import { Component } from '@angular/core';
import { StarshipService } from '../services/starship.service';
import { Starship } from '../models/starship';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-ships',
  templateUrl: './starships.component.html',
  styleUrls: ['./starships.component.css']
})
export class StarshipsComponent {
  public starships: Observable<any> = this.starshipService.getStarships();
  public columndefs: any[] = ['name', 'model'];

  constructor(private starshipService: StarshipService) { }

  ngOnInit(): void { }
}
