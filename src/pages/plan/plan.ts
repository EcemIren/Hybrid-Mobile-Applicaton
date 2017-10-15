import { Component } from '@angular/core';
import {NotificationPage } from '../notification/notification';
import { NavController, NavParams, AlertController} from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { NgCalendarModule } from 'ionic2-calendar';
import * as moment from 'moment';
import { DataService } from '../../providers/data-service';
import { FormBuilder, Validators } from '@angular/forms';
import * as firebase from 'firebase';
import { ViewController, LoadingController } from 'ionic-angular';
import { DatePickerModule } from 'datepicker-ionic2';
import { PlannedTour } from '../../providers/interfaces';
import { Completed } from '../../providers/completed';

@Component({
  selector: 'page-plan',
  templateUrl: 'plan.html'
})
export class PlanPage {

    id: any;
    fee: any;
    season: any;
    name: any;
    country: any;
    nav: any;
    description: any;
 
    public localDate: Date = new Date();
    public maxDate: Date = new Date(new Date().setDate(new Date().getDate() + 30));
    public min: Date = new Date()
    public stringDate: any;

    usersRef: any = firebase.database().ref('users');
    plannedList: FirebaseListObservable<any>;
   
    constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,public comp: Completed, public dataService: DataService, public af: AngularFire) {
        //Details sayfasından veri çekme.
        this.id = navParams.get('id');
        console.log(this.id);
        this.fee = navParams.get('fee');
        this.season = navParams.get('season');
        this.name = navParams.get('name');
        this.country = navParams.get('country');
        this.nav = navCtrl;
        this.description = navParams.get('description');

        this.plannedList = af.database.list('/planned');

     

  }
    ionViewDidLoad() {
        console.log('ionViewDidLoad PlanPage');
    }
    



    public Log(stuff): void {
        console.log(stuff);
    }

    public event(data: Date): void {
        this.localDate = data;
    }
 



presentConfirm() {
   
     this.stringDate = this.localDate.toDateString()+" "+this.localDate.toTimeString();;
     console.log(this.stringDate);
   
    var self = this;
    let uid = this.dataService.getLoggedInUser().uid;
    let alert = this.alertCtrl.create({
        title: 'Confirmation',
        message: 'Are you sure you want to add this trip to your schedule?',
      
        buttons: [
            {
                
                text: 'NO',
                role: 'cancel',
                handler: () => {
                    console.log('NO clicked');
                   
                }
            },
            {
                text: 'YES',
                handler: () => {
                    console.log('YES clicked');
                     

                    let newPlanned: PlannedTour = {
                    key: null,
                    uid: uid,
                    tourid: this.id,
                    localDate: this.stringDate
               };
               
             
             
             
                 this.plannedList.push(newPlanned).then(function(newPlanned) {

                    self.comp.userplannedSequences.push({id: self.id, localDate: self.stringDate});
         
                    let userRef = self.usersRef.child(uid + '/planned/');

                    userRef.set(self.comp.userplannedSequences);

                });  
                    self.nav.push(NotificationPage, {
                        id: this.id,
                        fee: this.fee,
                        season: this.season,
                        name: this.name,
                        country: this.country,
                        localDate:this.localDate,
                        description: this.description,

                    });
                
                }
            }
        ]
    });
    alert.present();
}

}
   
 
 
  

