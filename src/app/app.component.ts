import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import * as firebase from 'firebase';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { LoginPage } from '../pages/login/login';
import { ToursListPage } from '../pages/tours-list/tours-list';
import { CreateTourPage } from '../pages/create-tour/create-tour';
import { ProfilePage } from '../pages/profile/profile';
import { HomepagePage } from '../pages/homepage/homepage';
import { StepsPage } from '../pages/steps/steps';
import { NotificationPage } from '../pages/notification/notification';
import { PlanPage } from '../pages/plan/plan';
import { AuthService } from '../providers/auth-service';
import { SearchPipe } from '../pipes/search';
import { PlayDetPage } from '../pages/playdet/playdet';
import { MyschedulePage } from '../pages/myschedule/myschedule';
import { DataService } from '../providers/data-service';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  username: any;

  rootPage: any = LoginPage;

  pages: Array<{title: string,icon :any, component: any}>;

  constructor(public platform: Platform, public authService: AuthService, public dataService: DataService) {
   
    this.initializeApp();

    var self = this;

   firebase.auth().onAuthStateChanged((user) => {
   if (user) {
      
      this.rootPage = HomepagePage;
      let uid = this.dataService.getLoggedInUser().uid;

      this.dataService.getUsername(uid).then(function (snapshot) {
      self.username = snapshot.val();
     });
   
  } else {
      
      this.rootPage = LoginPage;
     
  }
});

  
  // used for an example of ngFor and navigation
    this.pages = [

        { title: "Homepage", component: HomepagePage, icon: "ios-home"},
        { title: "Profile", component: ProfilePage, icon: "ios-contact"},
        { title: "Discover", component: ToursListPage, icon: "ios-globe"},
        { title: "Create Tour", component: CreateTourPage, icon: "ios-create"},
        { title: "Scheduled", component: MyschedulePage, icon: "ios-alarm"},
  
    ];

}


  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }




  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
  this.authService.doLogout();
  console.log("logout");
}

}
