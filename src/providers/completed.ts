import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { DataService } from '../providers/data-service';
import * as firebase from 'firebase';
/*
  Generated class for the Completed provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Completed {

 //Bu serviste tüm tamamlanmış adımları tutan bir dizi var 
 public completedItems : any = [];
 public stepSequences : any = [];
 public usersRef;
 public usertoursSequences: any;
 public userplannedSequences: any = [];
 public uservisitedSequences: any = [];

  constructor(public http: Http,public dataService: DataService) {

    this.usertoursSequences = [];
    var self = this;
    let uid = this.dataService.getLoggedInUser().uid;
    this.usersRef  = firebase.database().ref('users/'+uid+'/tours');
    this.usersRef.once('value', function(snapshot) {
    snapshot.forEach(function(vote) {
       self.usertoursSequences.push({ id: vote.val().id, name: vote.val().name });
    });

  });

   this.userplannedSequences = [];

   this.usersRef  = firebase.database().ref('users/'+uid+'/planned');
    this.usersRef.once('value', function(snapshot) {
    snapshot.forEach(function(vote) {
       self.userplannedSequences.push({id: vote.val().id, localDate: vote.val().localDate});
    });

  });


   this.uservisitedSequences = [];

   this.usersRef  = firebase.database().ref('users/'+uid+'/visited');
    this.usersRef.once('value', function(snapshot) {
    snapshot.forEach(function(vote) {
       self.uservisitedSequences.push({id: vote.val().id});
    });

  });

    console.log('Hello Completed Provider');
}

  addCompletedItems(item)
  {                                                                          
    this.completedItems.push(item);
  }
}
