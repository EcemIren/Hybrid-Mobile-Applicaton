import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { StepdetailsPage } from '../stepdetails/stepdetails';
import { Completed } from '../../providers/completed';
import { DataService } from '../../providers/data-service';
import * as firebase from 'firebase';

@Component({
    selector: 'page-playdet',
    templateUrl: 'playdet.html'
})


export class PlayDetPage {
   
    id: any;
    fee: any;
    season: any;
    name: any;
    country: any;
    nav: any;
    description: any;
    usersRef: any = firebase.database().ref('users');
    uid: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public dataService: DataService, public comp: Completed) {
        this.id = navParams.get('id');
        console.log(this.id);
        this.fee = navParams.get('fee');
        this.season = navParams.get('season');
        this.name = navParams.get('name');
        this.country = navParams.get('country');
        this.nav = navCtrl;
        this.description = navParams.get('description');

        this.uid = this.dataService.getLoggedInUser().uid;
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad PlayDetPage');
    }



    goDetails() {

      var self = this;

      self.comp.uservisitedSequences.push({ id: this.id });
         
      let userRef = self.usersRef.child(this.uid + '/visited/');

      userRef.set(self.comp.uservisitedSequences);

      this.nav.push(StepdetailsPage,
      {
            id: this.id
      });
    }

}


