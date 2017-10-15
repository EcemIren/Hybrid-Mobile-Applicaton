import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { StepsummaryPage } from '../stepsummary/stepsummary';
import { PlanPage } from '../plan/plan';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { PlayDetPage } from '../playdet/playdet';
import { DataService } from '../../providers/data-service';
import { FormBuilder, Validators } from '@angular/forms';
import * as firebase from 'firebase';
import { ViewController, LoadingController } from 'ionic-angular';
/*
  Generated class for the Detail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-detail',
    templateUrl: 'detail.html'
})
export class DetailPage {

    id: any;
    fee: any;
    season: any;
    name: any;
    country: any;
    nav: any;
    description: any;
    status: any;
 
    constructor(public navCtrl: NavController, public navParams: NavParams) {
        
        this.id = navParams.get('key');
        this.fee = navParams.get('fee');
        this.season = navParams.get('season');
        this.name = navParams.get('name');
        this.country = navParams.get('country');
        this.nav = navCtrl;
        this.description = navParams.get('description');
        this.status = navParams.get('status');
    }

    goSummaryPage(fee,season,name,country,description) {
        this.nav.push(StepsummaryPage, {
            id: this.id,
            fee: fee,
            season: season,
            name: name,
            country:country,
            description: description,
        } );
    }


    goPage() {

        if(this.status==true)
        {
            this.nav.push(PlayDetPage, {
            id: this.id,
            fee: this.fee,
            season: this.season,
            name: this.name,
            country: this.country,
            description: this.description
         });

        }

        else
        {
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
   

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }

}
