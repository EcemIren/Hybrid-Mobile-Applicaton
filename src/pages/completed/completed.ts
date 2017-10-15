import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Completed } from '../../providers/completed';
import { StepsPage } from '../steps/steps';
/*
  Generated class for the Completed page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-completed',
  templateUrl: 'completed.html'
})
export class CompletedPage {

  public finalCompletedList : any = [];
  id: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public completedService: Completed) {
  
     this.finalCompletedList = completedService.completedItems;
     this.id = navParams.get('id');
  }

   goStepsPage()
  {
    this.navCtrl.setRoot(StepsPage, {
      id: this.id
    });
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad CompletedPage');
  }

}
