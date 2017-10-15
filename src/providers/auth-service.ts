import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';

/*
  Generated class for the AuthService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthService {
  
    public fireAuth: any;
    public userData: any;


  constructor(public http: Http) {
    console.log('Hello AuthService Provider');

    //Veritabanı referanslarını tanımlamak için öncelikle firebase doğrulamayı  ve users tablosunu programda 
    //store ediyoruz

    this.fireAuth = firebase.auth();
    this.userData = firebase.database().ref('/users');
  }

  doLogin(email: string, password: string): any {

     return this.fireAuth.signInWithEmailAndPassword(email,password);

  }


 //Register sayfasından kullanıcıyı kaydetmek için kullanılacak
  register(email: string, password: string, username: string): any {
    
    return this.fireAuth.createUserWithEmailAndPassword(email,password)

    //Başarılı bir şekilde yeni kullanıcı yaratılırsa users tablosunda yeni eklenen kaydın email sütunu set edilecek
    .then((newUser) => {
       this.userData.child(newUser.uid).set({username: username});
      
    });

  }

  //Kulanıcının çıkış yapması için kullanılacak
  doLogout(): any
  {
    return this.fireAuth.signOut();
  }
}
