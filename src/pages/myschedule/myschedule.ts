import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, Platform } from 'ionic-angular';
import { PlannedTour } from '../../providers/interfaces';
import { DataService } from '../../providers/data-service';
import {PlanPage} from '../plan/plan';
import * as firebase from 'firebase';
import {ToursListPage} from '../tours-list/tours-list';
import { DetailPage } from '../detail/detail';
/*
  Generated class for the Myschedule page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-myschedule',
  templateUrl: 'myschedule.html'
})
export class MyschedulePage {

  public planned: any = [];
  public visited: any = [];

  constructor(public nav: NavController, public navParams: NavParams, public dataService: DataService, public actionsheetCtrl: ActionSheetController, public platform: Platform){

   var self = this;
   let uid = this.dataService.getLoggedInUser().uid;
       
        var path = firebase.database().ref("users/" +uid+"/planned");
        var path2 = firebase.database().ref("users/" +uid+"/visited");
       
        path.once("value")
       .then(function(snapshot) {


        snapshot.forEach(function(childSnapshot) {

         var key = childSnapshot.key;

         var id = childSnapshot.val().id;
         var localDate = childSnapshot.val().localDate;

         var tours = firebase.database().ref("/tours");

         tours.child(id).once('value').then(function(snapshot) {

         
         var fee = snapshot.val().fee;
         var season = snapshot.val().season;
         var name = snapshot.val().name;
         var country = snapshot.val().country;
         var description = snapshot.val().description;

         var tour = new Planned(id,fee,season,name,country,description,localDate);
         self.planned.push(tour);
        });
    });
  });



    path2.once("value")
       .then(function(snapshot) {


        snapshot.forEach(function(childSnapshot) {

         var key = childSnapshot.key;

         var id = childSnapshot.val().id;
        
         var tours = firebase.database().ref("/tours");

         tours.child(id).once('value').then(function(snapshot) {

         
         var fee = snapshot.val().fee;
         var season = snapshot.val().season;
         var name = snapshot.val().name;
         var country = snapshot.val().country;
         var description = snapshot.val().description;

         var tour = new Visited(id,fee,season,name,country,description);
         self.visited.push(tour);
        });
    });
  });
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyschedulePage');
  }

  openMenu(item) {
        let actionSheet = this.actionsheetCtrl.create({
            title: 'What do you want do?',
            cssClass: ' yellow-color',
            buttons: [
                {
                    text: 'Remove this tour',
                    role: 'destructive',
                    icon: !this.platform.is('ios') ? 'trash' : null,
                    cssClass: 'green-color',
                    handler: () => {
                        console.log('Remove clicked');
                        this.nav.push(ToursListPage);
                       
                        
                    }
                },
                {
                    text: 'Select a different date',
                    icon: !this.platform.is('ios') ? 'calendar' : null,
                    cssClass: 'yellow-color',
                    handler: () => {
                        console.log('Change Date clicked');
                        this.nav.push(PlanPage, {id: item.id,
                            fee: item.fee,
                            season: item.season,
                            name: item.name,
                            country: item.country,
                            description: item.description});
                    }
                }
            ]
        });
        actionSheet.present();
    }


    //Navigate to Detail Page
    goDetailPage(key, fee, season, name, country, description,status) {
        this.nav.push(DetailPage, {
            key: key,
            fee: fee,
            season: season,
            name: name,
            country: country,
            description: description,
            status: true
        });
    }


}


  
  export class Planned {

    constructor(public id: string, public fee: string, public season: string, public name: string, public country: string, public description: string, public localDate: string) { 
  }
}


   export class Visited {

    constructor(public id: string, public fee: string, public season: string, public name: string, public country: string, public description: string) { 
  }

}
