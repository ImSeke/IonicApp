import { ChangeDetectorRef, Injectable } from '@angular/core';
import { ConnectionStatus, Network } from '@capacitor/network';
import { from, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkCheckerService {
  online!: boolean;
  connection_date!: number;
  status!: Observable<boolean>;
  constructor() {
    this.logNetworkState();
  }

  async openCheckNetwork() {
    Network.addListener('networkStatusChange', (status) => {
      console.log('Network status changed', status.connected);
      this.logNetworkState();
      of(status.connected).subscribe(connected => {
        this.online = connected;
        if (connected == true) {
          this.connection_date = Date.now();
        }
      });
    });
  }

  async logNetworkState() {
  this.status = of(await (await Network.getStatus()).connected);
    // of(status.connected).subscribe(connected => {
    //   if (connected == true) {
    //     this.connection_date = Date.now();
    //   }
    //   return connected;
    // });

  }
}
