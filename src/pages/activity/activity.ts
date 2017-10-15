import { Completed } from '../../providers/completed';
import { CompletedPage } from '../completed/completed';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewController, LoadingController ,ActionSheetController, AlertController } from 'ionic-angular';
import { IAction } from '../../providers/interfaces';
import { Image} from '../../providers/interfaces';
import { DataService } from '../../providers/data-service';
import { AuthService } from '../../providers/auth-service';
import { FormBuilder, Validators } from '@angular/forms';
import { StepsPage } from '../steps/steps';
import * as firebase from 'firebase';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Camera, CameraOptions } from 'ionic-native';
import {googlemaps} from 'googlemaps';
import { Geolocation, GoogleMap } from 'ionic-native';
import { Validateage } from  '../../providers/validateage';
/*
  Generated class for the Activity page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-activity',
  templateUrl: 'activity.html'
})
export class ActivityPage {

  public createActivityForm;
  public mapForm;

  titleChanged: boolean = false;
  nameChanged: boolean = false;
  shopTypeChanged: boolean = false;
  longtitudeChanged: boolean = false;
  latitudeChanged: boolean = false;
  descriptionChanged: boolean = false;
  costChanged: boolean = false;
  submitAttempt: boolean = false;
  submitAttempt2: boolean = false;
  id: any;
  stepList: FirebaseListObservable<any>;
  toursRef: any = firebase.database().ref('tours');
  stepsRef: any = firebase.database().ref('actions');
  imageList: FirebaseListObservable<any>;
  public imageSequences : any = [];
  stepId: any;
  stepName: any;
  currentMap: any;
  locationInfo: any;

   constructor(public navCtrl: NavController, public navParams: NavParams,  public loadingCtrl: LoadingController,
    public viewCtrl: ViewController,
    public fb: FormBuilder, public mapf: FormBuilder,
    public dataService: DataService, public authservice: AuthService, public af: AngularFire,public ang: AngularFire, public compl: Completed, public action: ActionSheetController, public alertCtrl: AlertController) {

   this.createActivityForm = this.fb.group({
      title: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      name: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      shopType: ['', Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required])],
      cost: ['', Validators.compose([Validators.required, Validateage.isValid])]
    });

      this.mapForm = this.mapf.group({

      location: ['', Validators.compose([Validators.required])] 

    });


     this.id = navParams.get('newId');

    //Database'de actions tablosunda bulunan kayıtları liste şeklinde programda kullanabiliriz
     this.stepList = af.database.list('/actions');


    //Database'de images tablosunda bulunan kayıtları liste şeklinde programda kullanabiliriz
     this.imageList = ang.database.list('/images');
  }


   elementChanged(input){
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }

  onSubmit(action: any): void {

    this.submitAttempt = true;
    var self = this;
    

    //Eğer forma başarılı bir şekilde veriler yerleştirildiyse
    if (this.createActivityForm.valid) {
      
      //Kullanıcıya oluşturulduğuna dair mesaj görüntüleniyor
      let loader = this.loadingCtrl.create({
        content: 'Activity step added...'
      });
 
     loader.present();

      //Daha sonra veritabanından o anki turun id bilgisi çekiliyor
      let tourId = this.id;
     
      //O anki turun adı veritabanından çekiliyor
      self.dataService.getTourname(tourId).then(function (snapshot) {
      let tourName = snapshot.val();
     
      // Veritabanına kaydetmek amacıyla IAction sınıfından yeni bir step oluşturuluyor
        let newAction: IAction = {
            key: null,
            title: action.title,
            name: action.name,
            category: action.shopType,
            cost: action.cost,
            description: action.description,
            icon: "flag",
            type: "ACTIVITY",
            latitude: "test",
            longtitude: "test",
            formattedAddress: "test",
            tourId: tourId,
            tourName: tourName

      };

    
      // Data servis arayüzünün veri ekleme fonksiyonu kullanılarak veritabanına veri ekleniyor
         self.stepList.push(newAction).then(function(newAction) {

         loader.dismiss();

         self.compl.stepSequences.push({id: newAction.key, type: "ACTIVITY"});

         let countRef = self.toursRef.child(tourId + '/steps/');
         countRef.set(self.compl.stepSequences);

         self.stepId = newAction.key;
         self.stepName = action.title;
         console.log("success");
       }, 
    
         //Veri eklenemezse hata mesajı verilir
            function (error) {
              console.error(error);
              loader.dismiss();
            });
         });
      
      }
}


submit(action: any): void {

    this.submitAttempt2 = true;
    var self = this;
    var geocoder = new google.maps.Geocoder();
    var address = action.location;

     //Eğer forma başarılı bir şekilde location verisi eklendiyse
     if (this.mapForm.valid) {

      geocoder.geocode({'address': address}, function(results, status) {

         console.log(results[0].geometry.location);
         this.currentMap  = new google.maps.Map(document.getElementById('map'), {
         zoom: 8,
         center: results[0].geometry.location

      });

      var marker = new google.maps.Marker({
         map: this.currentMap,
         position: results[0].geometry.location,
         title: address
     });

       self.locationInfo = results[0].geometry.location;
       
       console.log(self.locationInfo);

       self.stepsRef.child(self.stepId + '/latitude').set(self.locationInfo.lat());
       self.stepsRef.child(self.stepId + '/longtitude').set(self.locationInfo.lng());
       self.stepsRef.child(self.stepId + '/formattedAddress').set(results[0].formatted_address);

       let infoWindow = new google.maps.InfoWindow;

       infoWindow.setContent(results[0].formatted_address);

       google.maps.event.addListener(marker, 'click', function(){

         infoWindow.open(self.currentMap, marker);
    
   });
  });
  
  }
}
  initMap() {
        
     this.currentMap  = new google.maps.Map(document.getElementById('map'), {
          zoom: 8,
          center: {lat: -34.397, lng: 150.644}
      });
   }



  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivityPage');
    this.initMap();
  }


  complete()
  {
      this.compl.addCompletedItems(this.stepName);
      //Step ekledikten sonra tekrardan Steps sayfasına giderken turun id'sini tekrardan parametre olarak
        //yollamamız gerekir, burada amaç seçilen diğer bir adıma o anki turun id'sini yollamak
               this.navCtrl.push(CompletedPage, {
               id: this.id
        });


  }



   imageUpload()
   {
      var self = this;
      let actionSheet = this.action.create({
      title: 'Upload image from',
      buttons: [
        {
          text: 'Camera',
          icon: 'camera',
          handler: () => {
          self.openCamera(Camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Album',
          icon: 'folder-open',
          handler: () => {
          self.openCamera(Camera.PictureSourceType.PHOTOLIBRARY);
          }
        }
      ]
    });
 
    actionSheet.present();
   }

   openCamera(pictureSourceType: any) {

    var self = this;
 
    let options: CameraOptions = {
      quality: 95,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: pictureSourceType,
      encodingType: Camera.EncodingType.PNG,
      targetWidth: 400,
      targetHeight: 400,
      saveToPhotoAlbum: true,
      correctOrientation: true
    };
 
    Camera.getPicture(options).then(imageData => {

      const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
        const byteCharacters = atob(b64Data);
        const byteArrays = [];
 
        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
          const slice = byteCharacters.slice(offset, offset + sliceSize);
 
          const byteNumbers = new Array(slice.length);
          for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
          }
 
          const byteArray = new Uint8Array(byteNumbers);
 
          byteArrays.push(byteArray);
        }
 
        const blob = new Blob(byteArrays, { type: contentType });
        return blob;
      };
 
      let capturedImage: Blob = b64toBlob(imageData, 'image/png');

      self.startUploading(capturedImage);

    }, error => {
      console.log('ERROR -> ' + JSON.stringify(error));
    });
  }


  startUploading(file) {
 
        let self = this;

        let uid = self.dataService.getLoggedInUser().uid;
        let progress: number = 0;

     
        // display loader
        let loader = this.loadingCtrl.create({
            content: 'Uploading image..',
        });

        loader.present();


 
        // Upload file and metadata to the object 'images/mountains.jpg'
        var metadata = {
            contentType: 'image/png',
            cacheControl: 'no-cache',
        };
        
        var fileName = new Date().getTime() + '.png';
 
        var uploadTask = self.dataService.getStorageRef().child('images/' + uid + fileName).put(file, metadata);
        
        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
            function (snapshot) {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

            }, function (error) {

                loader.dismiss().then(() => {
                    switch (error.code) {
                        case 'storage/unauthorized':
                            // User doesn't have permission to access the object
                            break;
 
                        case 'storage/canceled':
                            // User canceled the upload
                            break;
 
                        case 'storage/unknown':
                            // Unknown error occurred, inspect error.serverResponse
                            break;
                    }
                });
            },

            function () {

                loader.dismiss().then(() => {

                // Upload completed successfully, now we can get the download URL
                var downloadURL = uploadTask.snapshot.downloadURL;

                    let newImage: Image = {

                     key: null,
                     photoPath: downloadURL,
                     stepId: self.stepId

                  };

                self.imageList.push(newImage).then(function(newImage) {

                    self.imageSequences.push({id: newImage.key,path: downloadURL});

                    let countRef = self.stepsRef.child(self.stepId + '/images/');
                    countRef.set(self.imageSequences);

                    
                },
                
            //Veri eklenemezse hata mesajı verilir
            function (error) {
             
            let alert = self.alertCtrl.create({
            message: error.message,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });

          alert.present();
        });
     });

   });

  }
     
}
