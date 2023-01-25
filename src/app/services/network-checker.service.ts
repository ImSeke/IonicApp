import { Injectable } from '@angular/core';
import { Network } from '@capacitor/network';
import { observable, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkCheckerService {
  online!: boolean;
  connection_date!: number;

  constructor() { }

  openCheckNetwork() {
    Network.addListener('networkStatusChange', (status) => {
      console.log('Network status changed', status.connected);
      this.online = status.connected;
      if(this.online == true){
        this.connection_date = Date.now() ;
      }
    });
    
  }

  async logNetworkState() {
    const status = await Network.getStatus();

    console.log('Network status: ', status.connected);
    
    this.online = status.connected;
    if(this.online == true){
      this.connection_date = Date.now() ;
    }
  }
}
