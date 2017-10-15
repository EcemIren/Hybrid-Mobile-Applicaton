import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { DetailPage } from '../detail/detail';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { SearchPipe } from '../../pipes/search';
import { BrowserModule } from '@angular/platform-browser';

import { ActivatedRoute } from '@angular/router'

import * as firebase from 'firebase';
/*
  Generated class for the ToursList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-tours-list',
    templateUrl: 'tours-list.html',
   
   
})
export class ToursListPage {

    //public items: any = [];
    public tourList: FirebaseListObservable<any>;
    nav: any;
    term = '';

    constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {

        this.tourList = af.database.list('/tours');
        this.nav = navCtrl;

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ToursListPage');
    }

    //Navigate to Detail Page
    goDetailPage(key, fee, season, name, country, description, status) {
        this.nav.push(DetailPage, {
            key: key,
            fee: fee,
            season: season,
            name: name,
            country: country,
            description: description,
            status: false
        });
    }

    Refresh(tourList:any)
    {
        return tourList;

    }

    pickFee(fee: any) {
        this.tourList = this.af.database.list('/tours', {
            query: {
                orderByChild: 'fee',
                 startAt: "1",  
               endAt: "39999999999999999999",
            }
        });
    }
  pickFee1(fee: any) {
        this.tourList = this.af.database.list('/tours', {
            query: {
                orderByChild: 'fee',
                startAt: "4",
                endAt: "69999999999999999999",




            }
        });
    }

    pickFee2(fee: any) {
        this.tourList = this.af.database.list('/tours', {
            query: {
                orderByChild: 'fee',
                startAt: "7",
                endAt: "9999999999999999999",




            }
        });
    }

    pickSeason(season: any) {

        this.tourList = this.af.database.list('/tours', {
            query: {
                orderByChild: 'season',
                equalTo: season
            }
        });
    }


    

    }
   

