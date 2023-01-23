import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
// const { Filesystem } = Plugins;


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
  // Add
  addData(planet_name: any, registration_date: any) {
    let data = [planet_name, registration_date];
    return this.storage.executeSql('INSERT INTO datatable (planet_name, registration_date) VALUES (?, ?)', data)
      .then(res => {
        this.getData();
      });
  }

  exportDatabase() {
    this.sqlPorter.exportDbToSql(this.storage).then((data) => {
      // Handle the exported SQL data here
      this.writeDatabaseFile(data);
      // this.readDatabaseFile(data);
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
    }).then(() => {
      console.log('File saved!');
    }).catch((error: any) => {
      console.log(error);
    });
  }

  // async readDatabaseFile(data: any) {
  //   const fileName = 'database.txt';
  //   const directory = Directory.Documents;

  //   await Filesystem.readFile({
  //     path: fileName,
  //     directory: directory
  //   }).then((data: { data: BlobPart; }) => {
  //     // Handle the read file data here
  //     console.log(data);
  //     let blob = new Blob([data.data], { type: 'text/plain' });
  //     var url = window.URL.createObjectURL(blob);
  //     var a = document.createElement("a");
  //     document.body.appendChild(a);
  //     a.href = url;
  //     a.download = fileName;
  //     a.click();
  //     window.URL.revokeObjectURL(url);
  //     a.remove();
  //   }).catch((error: any) => {
  //     console.log(error);
  //   });
  // }

  // exportAsSql() {
  //   this.sqlPorter.exportDbToSql(this.storage).then((data) => {
  //     // Handle the exported SQL data here
  //     const file = new Blob([data], {type: 'text/plain;charset=utf-8'});

  //     DbService.writeAndOpenFile(file, 'database.sql') ;
  //     console.log(data);
  //   }).catch((error) => {
  //     console.log(error);
  //   });
  // }

  // exportDatabase() {
  //   const dbName = 'positronx_db.db';
  //   const exportDir = this.file.dataDirectory;

  //   this.sqlPorter.exportDbToSql(this.storage)
  //     .then((sql) => {
  //       this.file.writeFile(exportDir, dbName, sql, { replace: true })
  //         .then(() => console.log('Export Successful'))
  //         .catch(e => console.error(e));
  //     })
  //     .catch(e => console.error(e));


  //   // this.sqlite.create({
  //   //     name: dbName,
  //   //     location: 'default'
  //   // })
  //   // .then((db) => {

  //   // })

  // }

  //   static async writeAndOpenFile(data: Blob, fileName: string) {
  //     var reader = new FileReader();
  //     reader.readAsDataURL(data);
  //     reader.onloadend = async function () {
  //         var base64data = reader.result;
  //         try {
  //             const result = await Filesystem.writeFile({
  //                 path: fileName,
  //                 data: <string>base64data,
  //                 directory: Directory.Data,
  //                 recursive: true
  //             });
  //             let fileOpener: FileOpener = new FileOpener();
  //             fileOpener.open(result.uri, data.type)
  //                 .then(() => console.log('File is opened'))
  //                 .catch(e => console.log('Error opening file', e));

  //             console.log('Wrote file', result.uri);
  //         } catch (e) {
  //             console.error('Unable to write file', e);
  //         }
  //     }
  // }

  // exportAsSQL() : Promise<any>
  // {
  //    return new Promise((resolve, reject) =>
  //    {
  //       this.sqlPorter
  //       .exportDbToSql(this.storage)
  //       .then((data) =>
  //       {
  //          resolve(data);
  //       })
  //       .catch((e) =>
  //       {
  //          reject(e);
  //       });
  //    });
  // }

}
