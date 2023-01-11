import { Component } from '@angular/core';
import { Haptics } from '@capacitor/haptics';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  title = 'Ionic-Angular-open-api';
  constructor() {}

  async vibration(){
    await Haptics.vibrate() ;
    console.log("Vibrating")
  }
}
