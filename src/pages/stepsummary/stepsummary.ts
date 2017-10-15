import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PlanPage } from '../plan/plan';
import * as firebase from 'firebase';
import { StepdetailsPage } from '../stepdetails/stepdetails';
import { StepbriefPage } from '../stepbrief/stepbrief';
/*
  Generated class for the Stepsummary page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-stepsummary',
  templateUrl: 'stepsummary.html'
})
export class StepsummaryPage {
    nav: any;

    id: any;
    fee: any;
    season: any;
    name: any;
    country: any;
    description: any;


    public Steps: any = [];
    public myStep : any = 5;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.nav = navCtrl;

        this.id = navParams.get('id');
        this.fee = navParams.get('fee');
        this.season = navParams.get('season');
        this.name = navParams.get('name');
        this.country = navParams.get('country');
        this.description = navParams.get('description');
         
        var self = this;
    
        var path = firebase.database().ref("tours/" +this.id+"/steps");

        path.once("value")
       .then(function(snapshot) {


        snapshot.forEach(function(childSnapshot) {

         var key = childSnapshot.key;

         var id = childSnapshot.val().id;

         var actions = firebase.database().ref("/actions");

         actions.child(id).once('value').then(function(snapshot) {

        
         var title = snapshot.val().title;
         var icon = snapshot.val().icon;
         var name = snapshot.val().name;
         var category = snapshot.val().category;
         var cost = snapshot.val().cost;

         console.log(title);
         self.Steps.push({title: title, icon: icon, name: name, category: category, cost: cost});
  
       });
      });
     });
    }
    
    goBrief(icon, description, name, title, cost, type, category) {
        this.nav.push(StepbriefPage,
         {
             icon: icon,
             description: description,
             name: name,
             title: title,
             cost: cost,
             type: type,
             category: category,


         });
    }

    goPlanPage(fee, season, name, country, description) {
        this.nav.push(PlanPage, {
            id: this.id,
            fee: fee,
            season: season,
            name: name,
            country: country,
            description: description,

        });
    }
  ionViewDidLoad() {
    console.log('ionViewDidLoad StepsummaryPage');
  }

}