import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';
import { IAction } from '../providers/interfaces';
import { Tour } from '../providers/interfaces';
import { Observable } from "rxjs/Rx";


/*
  Generated class for the DataService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DataService {

    //Veritabanı ve tablo referansları oluşturuluyor
    databaseRef: any = firebase.database();
    usersRef: any = firebase.database().ref('users');
    toursRef: any = firebase.database().ref('tours');
    actionsRef: any = firebase.database().ref('actions');
    storageRef: any = firebase.storage().ref();
    datesRef: any = firebase.storage().ref('dates');

  constructor(public http: Http) {
    console.log('Hello DataService Provider');
  }

   //Users tablosundan kullanıcı id'sine göre username değeri çekiliyor
   getUsername(userUid: string) {
        return this.usersRef.child(userUid + '/username').once('value');
    }

    //Tour tablosundan tour id'sine göre tourname değeri çekiliyor
    getTourname(tourId: string)
    {
      return this.toursRef.child(tourId + '/name').once('value');
    }

    //Veri eklenirken o anki giriş yapmış kullanıcıyı geri döndürecek, biz de kullanıcının istediğimiz özelliğine erişebileceğiz
    getLoggedInUser() {
        return firebase.auth().currentUser;
    }

     getStorageRef() {
       return this.storageRef;
    }

}
