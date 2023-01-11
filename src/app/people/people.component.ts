import { Component } from '@angular/core';
import { PersonService } from '../services/person.service';
import { Person } from '../models/person';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent {
  public people: Observable<any> = this.personService.getPeople();
  public columndefs: any[] = ['name', 'hair_color'];

  constructor(private personService: PersonService) { }

  ngOnInit(): void {
  }
}
