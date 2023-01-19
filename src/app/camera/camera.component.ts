import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BarcodeScanner, BarcodeScanResult } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { DbService } from '../services/db.service';
import { PlanetService } from '../services/planet.service';


@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
})
export class CameraComponent implements OnInit {
  private _REMOTE_URI: string = "http://localhost:8100/parse-data.php";
  public result: Observable<any> = new Observable<any>;
  public dataList: Observable<any> = new Observable<any>;
  public columndefs: any[] = ['name', 'climate'];
  constructor(
    private barcodeScanner: BarcodeScanner,
    private planetService: PlanetService,
    private dbService: DbService,
    private httpService: HttpClient,
    // private _ALERT: AlertController,
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
      this.getPlanet('https://swapi.dev/api/planets/2');
      // this.result = this.planetService.getOnePlanet('https://swapi.dev/api/planets/2');
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

  // exportAlert() {
    
  //   this.dbService.exportDatabase();
  // }

  // exportAlert(): void {
  //   let alert: any = this._ALERT.create({
  //     header: 'Export data',
  //     subHeader: 'Please select which export option you prefer',
  //     buttons: [
  //       {
  //         text: 'SQL',
  //         handler: () => {
  //           this.exportToSQL();
  //         }
  //       }
  //     ]
  //   });
  //   alert.present();
  // }

  // exportToSQL(): void {
  //   this.dbService
  //     .exportAsSQL()
  //     .then((res) => {
  //       let fileName: any = Date.now() + '.sql';
  //       this.parseAndUploadSQL(fileName, res);
  //     })
  //     .catch((error) => {
  //       console.dir(error);
  //     });
  // }

  // parseAndUploadSQL(fileName: string, sqlData: any) {
  //   let headers: any = new HttpHeaders({ 'Content-Type': 'application/octet-stream' }),
  //     options: any = { "name": fileName, "data": sqlData };

  //   this.httpService
  //     .post(this._REMOTE_URI, JSON.stringify(options), headers)
  //     .subscribe((res: any) => {
  //       console.dir(res);
  //     },
  //       (error: any) => {
  //         console.dir(error);
  //       });
  // }
}