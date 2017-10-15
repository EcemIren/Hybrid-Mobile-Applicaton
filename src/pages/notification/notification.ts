import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Platform, ActionSheetController } from 'ionic-angular';
import { PlayDetPage } from '../playdet/playdet';
import {PlanPage} from '../plan/plan';
import {ToursListPage} from '../tours-list/tours-list';
import * as firebase from 'firebase';
import { DataService } from '../../providers/data-service';
/*
  Generated class for the Detail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-notification',
    templateUrl: 'notification.html'
})
export class NotificationPage {

    id: any;
    fee: any;
    season: any;
    name: any;
    country: any;
    nav: any;
    localDate: any;
    description: any;
    public visited: any = [];

    constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform,
        public actionsheetCtrl: ActionSheetController, public dataService: DataService) {

        var self = this;
        let uid = this.dataService.getLoggedInUser().uid;
        var path2 = firebase.database().ref("users/" +uid+"/visited");
       
        this.id =  navParams.get('id');
        console.log(this.id);
        this.fee = navParams.get('fee');
        this.season = navParams.get('season');
        this.name = navParams.get('name');
        this.country = navParams.get('country');
        this.localDate = navParams.get('localDate');
        this.nav = navCtrl;
        this.description = navParams.get('description');


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
        console.log('ionViewDidLoad NotificationPage');
    }


    openMenu() {
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
                        this.nav.push(PlanPage, {
                            id: this.id,
                            fee: this.fee,
                            season: this.season,
                            name: this.name,
                            country: this.country,
                            description: this.description
                            
                        });
                    }
                }
            
           
            ]
        });
        actionSheet.present();
    }



    goPlayDetPage() {
        this.nav.push(PlayDetPage, {
            id: this.id,
            fee: this.fee,
            season: this.season,
            name: this.name,
            country: this.country,
            description: this.description
         });

    }
}


export class Visited {

    constructor(public id: string, public fee: string, public season: string, public name: string, public country: string, public description: string) { 
  }
}