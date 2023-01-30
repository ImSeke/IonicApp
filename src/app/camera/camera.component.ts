import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { Observable } from 'rxjs';
import { DbService } from '../services/db.service';
import { PlanetService } from '../services/planet.service';
import { NativeAudio } from '@awesome-cordova-plugins/native-audio/ngx';
@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
})
export class CameraComponent implements OnInit {
  public result: Observable<any> = new Observable<any>;
  public dataList: Observable<any> = new Observable<any>;
  public columndefs: any[] = ['name', 'climate'];
  public success_sound: any;
  public error_sound: any;

  constructor(
    private barcodeScanner: BarcodeScanner,
    private planetService: PlanetService,
    private dbService: DbService,
    private nativeAudio: NativeAudio
  ) { }

  ngOnInit() {
    this.setAudio();
    this.showData();
  }

  setAudio() {
    this.nativeAudio.preloadSimple('success', 'assets/sounds/success_notification.mp3').then(_ => console.log("Audio ready"));
    this.nativeAudio.preloadSimple('error', 'assets/sounds/error_notification.mp3').then(_ => console.log("Audio ready"));
  }

  playAudio() {   
    this.nativeAudio.play('success', () => console.log('Success_notification is done playing'));
  }

  scan() {
    this.barcodeScanner.scan({disableSuccessBeep: true}).then(barcodeData => {
      this.getPlanet(barcodeData.text);
      this.nativeAudio.play('success', () => console.log('Success_notification is done playing'));
      alert("We got a barcode\n" +
        "Result: " + barcodeData.text + "\n" +
        "Format: " + barcodeData.format + "\n" +
        "Cancelled: " + barcodeData.cancelled);
      console.log('Barcode data', barcodeData.text);
    }).catch(err => {
      this.nativeAudio.play('error', () => console.log('Error_notification is done playing'));
      alert("Scanning failed: " + err);
      console.log('Error', err);
    });
  }

  showData() {
    this.dataList = this.dbService.fetchData();
  }

  getPlanet(barcodeData: string) {
    this.planetService.getOnePlanet(barcodeData).subscribe(data => {
      this.result = data;
      this.dbService.addData(data.name, Date.now());
    });
  }

  exportAlert() {
    this.dbService.exportDatabase();
  }
}