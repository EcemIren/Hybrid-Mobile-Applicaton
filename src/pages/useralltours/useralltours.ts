import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { DataService } from '../../providers/data-service';
import { EditTourPage } from '../edit-tour/edit-tour';

/*
  Generated class for the Useralltours page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-useralltours',
  templateUrl: 'useralltours.html'
})
export class UseralltoursPage {

  public usertoursList: FirebaseListObservable<any>;
  public displayList: any = [];
  tourname: any;
  country: any;
  season: any;
  fee: any
  temp: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public dataService: DataService, public af: AngularFire) {

     var self = this;

     let uid = this.dataService.getLoggedInUser().uid;

     this.usertoursList = af.database.list('/users/' + uid + '/tours', { preserveSnapshot: true } );

     this.usertoursList.subscribe(snapshots => {
      snapshots.forEach(snapshot => {

          this.displayList.push({id: snapshot.val().id, name: snapshot.val().name});
       });
    });
 }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UseralltoursPage');
  }


  editItem(id: any)
  {
    var path = firebase.database().ref("tours/" +id);
    var self = this;

    path.once("value")
    .then(function(snapshot) {
      
      self.tourname = snapshot.val().name;
      self.temp = self.tourname;
      console.log(self.tourname);
      self.country = snapshot.val().country;
      console.log(self.country);
      self.season  = snapshot.val().season;
      console.log(self.country);
      self.fee = snapshot.val().fee;
      console.log(self.fee);

      self.navCtrl.push(EditTourPage, {tid: id, tname: self.tourname,
      tcountry: self.country,
      tseason: self.season,
      tfee: self.fee});
    });
  }

}
