import { Component } from '@angular/core';
import { Haptics } from '@capacitor/haptics';
import { Observable, of, switchMap } from 'rxjs';
import { NetworkCheckerService } from './services/network-checker.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  title = 'Ionic-Angular-open-api';

  constructor(public network: NetworkCheckerService) { }

  async ngOnInit() {
    await this.network.openCheckNetwork();
    await this.network.logNetworkState();
  }

  async vibration() {
    await Haptics.vibrate();
    console.log("Vibrating")
  }
}
