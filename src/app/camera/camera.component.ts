import { Component, OnInit } from '@angular/core';
import { BarcodeScanner} from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { Observable } from 'rxjs';
import { DbService } from '../services/db.service';
import { PlanetService } from '../services/planet.service';


@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
})
export class CameraComponent implements OnInit {
  public result: Observable<any> = new Observable<any>;
  public dataList: Observable<any> = new Observable<any>;
  public columndefs: any[] = ['name', 'climate'];

  constructor(
    private barcodeScanner: BarcodeScanner,
    private planetService: PlanetService,
    private dbService: DbService,
  ) { }

  ngOnInit() {
    this.showData();
  }

  scan() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.getPlanet(barcodeData.text);
      alert("We got a barcode\n" +
        "Result: " + barcodeData.text + "\n" +
        "Format: " + barcodeData.format + "\n" +
        "Cancelled: " + barcodeData.cancelled);
      console.log('Barcode data', barcodeData.text);
    }).catch(err => {
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