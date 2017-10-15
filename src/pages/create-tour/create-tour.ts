import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewController, LoadingController, MenuController } from 'ionic-angular';
import { Tour } from '../../providers/interfaces';
import { DataService } from '../../providers/data-service';
import { FormBuilder, Validators } from '@angular/forms';
import { StepsPage } from '../steps/steps';
import * as firebase from 'firebase';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Completed } from '../../providers/completed';
import { Validateage } from  '../../providers/validateage';
/*
  Generated class for the CreateTour page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-create-tour',
  templateUrl: 'create-tour.html'
})
export class CreateTourPage {

  public createTourForm;
  nameChanged: boolean = false;
  countryChanged: boolean = false;
  feeChanged: boolean = false;
  descriptionChanged: boolean = false;
  submitAttempt: boolean = false;
  tourList: FirebaseListObservable<any>;
  usersRef = firebase.database().ref('users');
  public usertoursSequences: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,  public loadingCtrl: LoadingController,
    public viewCtrl: ViewController,
    public fb: FormBuilder,
    public dataService: DataService, public af: AngularFire, public menu: MenuController, public comp: Completed) {

   this.createTourForm = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      country: ['', Validators.compose([Validators.required])],
      season: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      description: ['', Validators.compose([Validators.required])],
      fee: ['',Validators.compose([Validators.required,Validateage.isValid])]
    });
   
     this.menu.swipeEnable(true);

     //Database'de tour tablosunda bulunan kayıtları liste şeklinde programda kullanabiliriz
     this.tourList = af.database.list('/tours');

     

  }
    

   elementChanged(input){
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }

  onSubmit(tour: any): void {

    this.submitAttempt = true;
    var self = this;
    

    //Eğer forma başarılı bir şekilde veriler yerleştirildiyse
    if (this.createTourForm.valid) {
      
      //Kullanıcıya oluşturulduğuna dair mesaj görüntüleniyor
      let loader = this.loadingCtrl.create({
        content: 'Tour added...',
        dismissOnPageChange: true //loader başka sayfa geldiğinde kaybolacak
      });

    loader.present();

      //Daha sonra veritabanından o anki kullanıcının id bilgisi çekiliyor
      let uid = this.dataService.getLoggedInUser().uid;
     
      //Daha sonra veritabanından o anki kullanıcının name bilgisi çekiliyor
      this.dataService.getUsername(uid).then(function (snapshot) {
      let username = snapshot.val();

     
      // Veritabanına kaydetmek amacıyla Tour sınıfından yeni bir tur oluşturuluyor
        let newTour: Tour = {
            key: null,
            name: tour.name,
            country: tour.country,
            season: tour.season,
            description: tour.description,
            fee: tour.fee,
            user: { uid: uid, username: username }
          };
      
      //Yeni tur yaratılınca Adımlar sayfasına yönleniyoruz, bu arada yeni eklenen turun id'sini de sayfaya gönderiyoruz
      ///burada amaç belirli bir adımı eklerken turun id'sini de foreign key olarak ekleyebilmektir

      self.tourList.push(newTour).then(function(newTour) {


           self.comp.usertoursSequences.push({id: newTour.key, name: tour.name});
         

            let userRef = self.usersRef.child(uid + '/tours/');
            userRef.set(self.comp.usertoursSequences);

           self.navCtrl.setRoot(StepsPage, {
           id: newTour.getKey().toString()

         }); 
          
           console.log("success");
          
      }, 
         function (error) {
              console.error(error);
              loader.dismiss();
        });
      });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActionPage');
  }
}
