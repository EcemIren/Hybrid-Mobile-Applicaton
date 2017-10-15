import { Component } from '@angular/core';
import { NavController, AlertController, NavParams, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../providers/auth-service';
import { RegisterPage } from '../register/register';
import { ResetPage } from '../reset/reset';
import { HomepagePage } from '../homepage/homepage';
import { FoodPage } from '../food/food';
import { MenuController } from 'ionic-angular';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {

  public loginForm;
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  submitAttempt: boolean = false;
  loader: any;


  constructor(public navCtrl: NavController, public authService: AuthService, public navParams: NavParams, public alerCtrl: AlertController, public formBuilder: FormBuilder,public alertCtrl: AlertController, public loadingCtrl: LoadingController, public menu: MenuController, public angFire: AngularFire) {

    //Form elemanlarının kontrol edilmesi (boş geçilemez, minimum karakter sayısı, email formatı)
    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEXP)])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });

    this.menu.swipeEnable(false);

  }

  elementChanged(input){
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }

  register(){
    this.navCtrl.push(RegisterPage);
  }

  loginUser(){
    
    var self = this;
    this.submitAttempt = true;

    if (!this.loginForm.valid){
      console.log(this.loginForm.value);
    } 

    else {


      
      //Kullanıcın login olduğuna dair mesaj gösteriliyor
      let loader = this.loadingCtrl.create({
        content: 'You are logging...',
        dismissOnPageChange: true //loader başka sayfa geldiğinde kaybolacak
      });

 
    loader.present();

    this.authService.doLogin(this.loginForm.value.email, this.loginForm.value.password).then(authService => {

         let alert = this.alertCtrl.create({
            message: "Login successfully",
             buttons: ['Ok']
          });

          alert.present();

        
      }, error => {
          loader.dismiss().then( () => {
          let alert = this.alertCtrl.create({
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

 
    }
  }
  
  doAlert() {
      let alert = this.alerCtrl.create({
          title: 'RING RING! ',
          message: 'Tour is Starting Soon!!',
          buttons: ['Ok']
      });
      alert.present();
  }


    fbLogin()
  {
     this.angFire.auth.login({

     provider: AuthProviders.Facebook,
     method: AuthMethods.Popup
     }).then((response) => {

     console.log('Login success with facebook' + JSON.stringify(response));

     let currentuser = {

       email: response.auth.displayName,
       picture: response.auth.photoURL
     };

    }).catch((error) => {
     console.log(error);
 })

}


  twtLogin()
  {
     this.angFire.auth.login({

     provider: AuthProviders.Twitter,
     method: AuthMethods.Popup
     }).then((response) => {

     console.log('Login success with facebook' + JSON.stringify(response));

     let currentuser = {

       email: response.auth.displayName,
       picture: response.auth.photoURL
     };

    }).catch((error) => {
     console.log(error);
 })

}


}
