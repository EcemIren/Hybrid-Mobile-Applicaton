import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { DataService } from '../../providers/data-service';
//import { ToursStepsPage } from '../tours-steps/tours-steps';
import { EditTourPage } from '../edit-tour/edit-tour';
import { UseralltoursPage } from '../useralltours/useralltours';
import * as firebase from 'firebase';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AuthService } from '../../providers/auth-service';

import { ChatPage } from '../chat/chat';
/*
  Generated class for the Profile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  public usertoursList: FirebaseListObservable<any>;
  public displayList: any = [];
  public count: any = 0;
  tourname: any;
  country: any;
  season: any;
  fee: any;
  temp: any;
username: any;
constructor(public navCtrl: NavController,public toastCtrl: ToastController, public navParams: NavParams, public dataService: DataService,public authService: AuthService, public af: AngularFire) {

     var keepGoing = true;
     var self = this;

     let uid = this.dataService.getLoggedInUser().uid;

     this.usertoursList = af.database.list('/users/' + uid + '/tours', { preserveSnapshot: true } );

     this.usertoursList.subscribe(snapshots => {
      snapshots.forEach(snapshot => {

        if(keepGoing)
        {
          self.count = self.count+1;
          this.displayList.push({id: snapshot.val().id, name: snapshot.val().name});

          if(self.count==4)
          {
             keepGoing = false;
          }
        }

    });
  });
  
     firebase.auth().onAuthStateChanged((user) => {
   if (user) {
      
     
      let uid = this.dataService.getLoggedInUser().uid;

      this.dataService.getUsername(uid).then(function (snapshot) {
      self.username = snapshot.val();
     });
   
  } 
  
});
  
  
  
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  goCreatedPage()
  {
    this.navCtrl.push(UseralltoursPage);
  }

  itemClicked(gelenId: any)
  {
    //this.navCtrl.push(ToursStepsPage,
    //{id: gelenId});
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




  goChatPage() {

 let toast = this.toastCtrl.create({
      message: 'Chat is starting..',
      duration: 2000
    });
    toast.present();
  
      this.navCtrl.push(ChatPage);
  }

}
