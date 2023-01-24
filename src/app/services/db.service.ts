import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { FileOpener } from '@capacitor-community/file-opener';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  private storage!: SQLiteObject;
  dataList = new BehaviorSubject([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private platform: Platform,
    private sqlite: SQLite,
    private httpClient: HttpClient,
    private sqlPorter: SQLitePorter,
    // private fileOpener: FileOpener,
  ) {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'positronx_db.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.storage = db;
          this.getFakeData();
        });
    });
  }

  dbState() {
    return this.isDbReady.asObservable();
  }

  fetchData(): Observable<any> {
    return this.dataList.asObservable();
  }

  getFakeData() {
    this.httpClient.get(
      'assets/dump.sql',
      { responseType: 'text' }
    ).subscribe(data => {
      this.sqlPorter.importSqlToDb(this.storage, data)
        .then(_ => {
          this.getData();
          this.isDbReady.next(true);
        })
        .catch(error => console.error(error));
    });
  }

  getData() {
    return this.storage.executeSql('SELECT * FROM datatable ORDER BY registration_date DESC', []).then(res => {
      let items: any = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id: res.rows.item(i).id,
            planet_name: res.rows.item(i).planet_name,
            registration_date: res.rows.item(i).registration_date
          });
        }
      }
      this.dataList.next(items);
    });
  }

  addData(planet_name: any, registration_date: any) {
    let data = [planet_name, registration_date];
    return this.storage.executeSql('INSERT INTO datatable (planet_name, registration_date) VALUES (?, ?)', data)
      .then(res => {
        this.getData();
      });
  }

  exportDatabase() {
    this.sqlPorter.exportDbToSql(this.storage).then((data) => {

      this.writeDatabaseFile(data);

      console.log(data);
    }).catch((error) => {
      console.log(error);
    });
  }

  async writeDatabaseFile(data: any) {
    const fileName = 'database.txt';
    const directory = Directory.Documents;

    await Filesystem.writeFile({
      path: fileName,
      data: data,
      directory: directory,
      encoding: Encoding.UTF8
    }).then(async () => {
      console.log('File saved!');
      const uri = await Filesystem.getUri({
        path: fileName,
        directory: directory,
      });
      FileOpener.open({
        filePath: uri.uri
      }).then(() =>
        console.log('File is opened')
      );
    }).catch((error: any) => {
      console.log(error);
    });
  }
}
