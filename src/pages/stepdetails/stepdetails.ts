import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, AlertController,ToastController } from 'ionic-angular';
import { StepsummaryPage } from '../stepsummary/stepsummary';
import * as firebase from 'firebase';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable } from "rxjs/Observable";
import {googlemaps} from 'googlemaps';
import { PositionError, Geoposition, GoogleMap } from 'ionic-native';
//import { Geolocation } from '@ionic-native/geolocation';
import { HomepagePage } from '../homepage/homepage';
import { ChatPage } from '../chat/chat';
/*
  Generated class for the Stepdetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-stepdetails',
    templateUrl: 'stepdetails.html'
})
export class StepdetailsPage {
    nav: any

    public i: number = 0;
    public Steps: any = [];
    public myStep : any = 5;

    id: any;

    @ViewChild('map') mapElement: ElementRef;
    currentMap: any;
    latLng: any;
    
    marker: any;

    available: any = true;
    

    subscription: any;

    geoposition: any;

    photo: any;

    stepImages: FirebaseListObservable<any>;
    public displayList: any;

    next() {
       
        var self = this;
        this.i += 1;
        this.photo = false;
      

        if (this.i >= this.Steps.length) { 
         
          let infoAlert = this.alertControl.create({
          title: 'TOUR IS COMPLETED! ',
          message: 'Congratulations, you finished the trip!!',
          buttons: ['Ok']
        });

         infoAlert.present();
         this.nav.setRoot(HomepagePage); 
       }

        else
        {
          if(this.available == true)
          {
           self.marker.setMap(null);
          }

          this.myStep = this.Steps[this.i];

           if((self.myStep.latitude)!="test" && (self.myStep.longtitude)!="test")
          {
             this.available = true;
             self.latLng = new google.maps.LatLng(self.myStep.latitude,self.myStep.longtitude);


             let mapOptions = {
              center: self.latLng,
              zoom: 15,
              mapTypeId: google.maps.MapTypeId.ROADMAP,
              setMyLocationEnabled: true
           }


            
            self.currentMap = new google.maps.Map(self.mapElement.nativeElement, mapOptions);

            self.marker = new google.maps.Marker({
            map: self.currentMap,
            position:  self.latLng
          
     });

              

          let infoWindow = new google.maps.InfoWindow({
            content: self.myStep.formattedAddress
         });

         console.log(self.myStep.formattedAddress);

         google.maps.event.addListener(self.marker, 'click', function(){
              infoWindow.open(self.currentMap, self.marker);
         });


            
          }

         else
         {
          this.available = false;
          
          console.log("No Location Info Entered in This Step");

         }
        }
   }   

   previous() {
   
        this.i -= 1;
        var self = this;
        this.photo = false;

        if (this.i < 0) { 

          let infoAlert = this.alertControl.create({
          title: 'TOUR IS COMPLETED! ',
          message: 'Congratulations, you finished the trip!!',
          buttons: ['Ok']
        });

         infoAlert.present();
         this.nav.setRoot(HomepagePage); 

         }

         else
        {
          if(this.available == true)
          {
            self.marker.setMap(null);
          }

          this.myStep = this.Steps[this.i];

          if((self.myStep.latitude)!="test" && (self.myStep.longtitude)!="test")
          {
             this.available = true;
             self.latLng = new google.maps.LatLng(self.myStep.latitude,self.myStep.longtitude);


             let mapOptions = {
              center: self.latLng,
              zoom: 15,
              mapTypeId: google.maps.MapTypeId.ROADMAP,
              setMyLocationEnabled: true
           }


            
            self.currentMap = new google.maps.Map(self.mapElement.nativeElement, mapOptions);

            self.marker = new google.maps.Marker({
            map: self.currentMap,
            position:  self.latLng
          
     });

         let infoWindow = new google.maps.InfoWindow({
            content: self.myStep.formattedAddress
         });

         console.log(self.myStep.formattedAddress);

         google.maps.event.addListener(self.marker, 'click', function(){
              infoWindow.open(self.currentMap, self.marker);
         });
        }

         else
         {
          this.available = false;
          
          console.log("No Location Info Entered in This Step");

         }
        }
        
    }

    constructor(public navCtrl: NavController,public toastCtrl: ToastController,public navParams: NavParams, public alertControl: AlertController, public af: AngularFire) {  

      console.log("View is Loaded");
   
      this.id = navParams.get('id');
      console.log(this.id);
      this.nav = navCtrl;

      var self = this;

    
      var path = firebase.database().ref("tours/" +this.id+"/steps");

        path.once("value")
       .then(function(snapshot) {


        snapshot.forEach(function(childSnapshot) {

         var key = childSnapshot.key;

         var id = childSnapshot.val().id;

         var actions = firebase.database().ref("/actions");

         actions.child(id).once('value').then(function(snapshot) {

         var key = snapshot.key;
         var title = snapshot.val().title;
         var name = snapshot.val().name;
         var category = snapshot.val().category;
         var cost = snapshot.val().cost;
         var type = snapshot.val().type;
         var description = snapshot.val().description;
         var icon = snapshot.val().icon;
         var latitude = snapshot.val().latitude;
         var longtitude = snapshot.val().longtitude;
         var formattedAddress = snapshot.val().formattedAddress;

         var step = new Step(key,title,name,category,cost,type,description,icon,latitude,longtitude,formattedAddress);
         self.Steps.push(step);

         console.log(self.myStep);

         self.myStep = self.Steps[0];
    
          if((self.myStep.latitude)!="test" && (self.myStep.longtitude)!="test")
          {
             self.available = true;
             self.latLng = new google.maps.LatLng(self.myStep.latitude,self.myStep.longtitude);


             let mapOptions = {
              center: self.latLng,
              zoom: 15,
              mapTypeId: google.maps.MapTypeId.ROADMAP,
              setMyLocationEnabled: true
           }


            
            self.currentMap = new google.maps.Map(self.mapElement.nativeElement, mapOptions);

            self.marker = new google.maps.Marker({
            map: self.currentMap,
            position:  self.latLng
          
     });

              

          let infoWindow = new google.maps.InfoWindow({
            content: self.myStep.formattedAddress
         });

         console.log(formattedAddress);

         google.maps.event.addListener(self.marker, 'click', function(){
              infoWindow.open(self.currentMap, self.marker);
         });
       }

         else
         { 
          self.available = false;
          console.log("No Location Info Entered in This Step");

         }
         
         });
        });
       });


    }

    displayImage()
    {
       var self = this;
       this.displayList = [];
  
       //Burada stepe ait olan photolar diziye download url ile eklenecek
       this.stepImages = this.af.database.list('/actions/' + this.Steps[this.i].key + '/images', { preserveSnapshot: true } );

         self.stepImages.subscribe(snapshots => {
         snapshots.forEach(snapshot => {

          self.displayList.push({download: snapshot.val().path});
       });
    });

    if(self.displayList.length >0)
    {
      this.photo = true;

    }

    else
    {
       let alert = this.alertControl.create({
        title: 'Message',
        message: 'No Photo in this Step'
     });

   }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StepdetailsPage');


    
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

export class Step {

    constructor(public key: string, public title: string, public name: string, public category: string, public cost: string, public type: string, public description: string, public icon: string, public latitude: string, public longtitude: string, public formattedAddress: string) { 
  }

}
                                