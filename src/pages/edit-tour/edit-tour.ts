import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewController, LoadingController, MenuController } from 'ionic-angular';
import { Tour } from '../../providers/interfaces';
import { FormBuilder, Validators } from '@angular/forms';
import * as firebase from 'firebase';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { ProfilePage } from '../profile/profile';
import { DataService } from '../../providers/data-service';

/*
  Generated class for the EditTour page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-edit-tour',
  templateUrl: 'edit-tour.html'
})
export class EditTourPage {

  public editTourForm;
  nameChanged: boolean = false;
  countryChanged: boolean = false;
  feeChanged: boolean = false;
  submitAttempt: boolean = false;
  tourList: FirebaseListObservable<any>;
  id: any;
  usertoursList:FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public fb: FormBuilder,public loadingCtrl: LoadingController,public af: AngularFire, public dataService: DataService) {

      this.tourList = af.database.list('/tours');
      this.editTourForm = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      country: ['', Validators.compose([Validators.required])],
      season: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      fee: ['', Validators.compose([Validators.required])]
    });

    this.id = navParams.get('tid');

    this.editTourForm.controls['name'].setValue( navParams.get('tname'));
    this.editTourForm.controls['country'].setValue( navParams.get('tcountry'));
    this.editTourForm.controls['season'].setValue( navParams.get('tseason'));
    this.editTourForm.controls['fee'] .setValue( navParams.get('tfee'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditTourPage');
  }

   elementChanged(input){
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }


  onSubmit(tour: any): void {

    this.submitAttempt = true;
    var self = this;

    //Eğer forma başarılı bir şekilde veriler yerleştirildiyse
    if (this.editTourForm.valid) {
      
      //Kullanıcıya oluşturulduğuna dair mesaj görüntüleniyor
      let loader = this.loadingCtrl.create({
        content: 'Tour updating...',
        dismissOnPageChange: true //loader başka sayfa geldiğinde kaybolacak
      });

    loader.present();

     
    this.tourList.update(this.id, {
      name: tour.name,
      country: tour.country,
      season: tour.season,
      fee: tour.fee
    }).then( edit => {
       console.log("success");
       self.navCtrl.push(ProfilePage);
    }, error => {
      console.log(error);
    });
     
      
          
      }
    }
 



}