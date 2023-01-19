import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { PlanetsComponent } from './planets/planets.component'
import { PeopleComponent } from './people/people.component'
import { StarshipsComponent } from './starships/starships.component'
import { InputComponent } from './input/input.component';
import { CameraComponent } from './camera/camera.component';

const routes: Routes = [
  { path: 'planets', component: PlanetsComponent },
  { path: 'people', component: PeopleComponent },
  { path: 'starships', component: StarshipsComponent },
  { path: 'input', component: InputComponent },
  { path: 'camera', component: CameraComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
