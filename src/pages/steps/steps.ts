import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { FoodPage } from '../food/food';
import { AccomodationPage } from '../accomodation/accomodation';
import { ShoppingPage } from '../shopping/shopping';
import { TransportationPage } from '../transportation/transportation';
import { SightseeingPage } from '../sightseeing/sightseeing';
import { ActivityPage } from '../activity/activity';
import * as firebase from 'firebase';
import { LoginPage } from '../login/login';
import { HomepagePage } from '../homepage/homepage';
import { Completed } from '../../providers/completed';
import { ProfilePage } from '../profile/profile';
/*
  Generated class for the Steps page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-steps',
  templateUrl: 'steps.html',
 
})
export class StepsPage {
  
    nav: any;
    id: any;
  
    constructor(public navCtrl: NavController, public navParams: NavParams, public compl: Completed, private alertCtrl: AlertController) {
     
     this.nav = navCtrl;
     this.id = navParams.get('id');
}

 //Navigate to Food Page
  goFoodPage()
  {
      this.nav.push(FoodPage,{
      newId: this.id
    }); 
  }

  //Navigate to Accommodation Page
  goAccommodationPage()
  {
      this.nav.push(AccomodationPage,{
      newId: this.id
     }); 
  }
  
  //Navigate to Transportation Page
  goTransportationPage()
  {
     this.nav.push(TransportationPage,{
      newId: this.id
     }); 
  }
  
  //Navigate to Activity Page
  goActivityPage()
  {
     this.nav.push(ActivityPage,{
      newId: this.id
    }); 
  }
  
  //Navigate to Sightseeing Page
  goSightseeingPage()
  {
     this.nav.push(SightseeingPage,{
      newId: this.id
    }); 
  }
  
  //Navigate to Shopping Page
  goShoppingPage()
  {
    this.nav.push(ShoppingPage,{
      newId: this.id
    });   
  }

 

  presentConfirm() {
      let alert = this.alertCtrl.create({
          title: 'Confirm Create This Tour',
          message: 'Are you sure about create this tour?',
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
                      this.compl.stepSequences = [];
                      this.compl.completedItems = [];
                      this.nav.setRoot(ProfilePage);

                  }
              }
          ]
      });
      alert.present();
  }

}

