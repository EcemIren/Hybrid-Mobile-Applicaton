import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { StepsummaryPage } from '../stepsummary/stepsummary';
import * as firebase from 'firebase';

/*
  Generated class for the Stepbrief page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-stepbrief',
  templateUrl: 'stepbrief.html'
})
export class StepbriefPage {
    nav: any;

    id: any;
    name: any;
    description: any;
    icon: any;
    title: any;
    cost: any;
    category: any;
    type: any;


    public Steps: any = [];
    public myStep: any = 5;

    constructor(public navCtrl: NavController, public navParams: NavParams) {

        this.nav = navCtrl;
        
        this.cost = navParams.get('cost');
        this.name = navParams.get('name');
        this.description = navParams.get('description');
        this.category = navParams.get('category');
        this.title = navParams.get('title');
        this.type = navParams.get('type');
        this.icon = navParams.get('icon');

        var self = this;

       
            }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StepbriefPage');
  }

}
