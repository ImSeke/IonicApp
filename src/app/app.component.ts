import { ChangeDetectorRef, Component } from '@angular/core';
import { Haptics } from '@capacitor/haptics';
import { from, Observable, of, switchMap } from 'rxjs';
import { NetworkCheckerService } from './services/network-checker.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  title = 'Ionic-Angular-open-api';
  // netwokrState: Observable<boolean> = from(this.network.logNetworkState());
  constructor(public _network: NetworkCheckerService, private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this._network.openCheckNetwork();
  }


  async vibration() {
    await Haptics.vibrate();
    console.log("Vibrating")
  }
}
