import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { FoodPage } from '../pages/food/food';
import { AccomodationPage } from '../pages/accomodation/accomodation';
import { ShoppingPage } from '../pages/shopping/shopping';
import { TransportationPage } from '../pages/transportation/transportation';
import { SightseeingPage } from '../pages/sightseeing/sightseeing';
import { ActivityPage } from '../pages/activity/activity';
import { StepsPage } from '../pages/steps/steps';
import { StepsummaryPage } from '../pages/stepsummary/stepsummary';
import { StepdetailsPage } from '../pages/stepdetails/stepdetails';
import { ProfilePage } from '../pages/profile/profile';
import { ToursListPage } from '../pages/tours-list/tours-list';
import {AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { AuthService } from '../providers/auth-service';
import { DataService } from '../providers/data-service';
import { Completed } from '../providers/completed';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ResetPage } from '../pages/reset/reset';
import { CompletedPage } from '../pages/completed/completed';
import { CreateTourPage } from '../pages/create-tour/create-tour';
import { DetailPage } from '../pages/detail/detail';
import { StepbriefPage } from '../pages/stepbrief/stepbrief';
import { HomepagePage } from '../pages/homepage/homepage';
import { NotificationPage } from '../pages/notification/notification';
import { PlayDetPage } from '../pages/playdet/playdet';
import { PlanPage } from '../pages/plan/plan';
import { EditTourPage } from '../pages/edit-tour/edit-tour';
import * as firebase from 'firebase';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../pipes/search';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgCalendarModule } from 'ionic2-calendar';
import { DatePickerModule } from 'datepicker-ionic2';
import { Validateage } from '../providers/validateage';
import { UseralltoursPage }  from '../pages/useralltours/useralltours';
import { ChatPage } from '../pages/chat/chat';
import { MyschedulePage } from '../pages/myschedule/myschedule';

export const firebaseConfig = {

   apiKey: "AIzaSyCSuWSv20_Owt1C0yjmDj1g2HPzQIIGtAE",
    authDomain: "myproject-e2523.firebaseapp.com",
    databaseURL: "https://myproject-e2523.firebaseio.com",
    storageBucket: "myproject-e2523.appspot.com",
    messagingSenderId: "934162489859"
  
};

const myFirebaseAuthConfig = {
  
   provider: AuthProviders.Password,
   method: AuthMethods.Password

}

firebase.initializeApp(firebaseConfig);

@NgModule({
    declarations: [
    MyApp,
    Page1,
    Page2,
    FoodPage,
    AccomodationPage,
    ActivityPage,
    ShoppingPage,
    SightseeingPage,
    ActivityPage,
    TransportationPage,
    StepsPage,
    ProfilePage,
    ToursListPage,
    LoginPage,
    RegisterPage,
    ResetPage,
    CompletedPage,
    CreateTourPage,
    StepdetailsPage,
    DetailPage,
    StepbriefPage,
    StepsummaryPage,
    HomepagePage,
    NotificationPage,
    PlanPage,
    SearchPipe,
    PlayDetPage,
    EditTourPage,
    UseralltoursPage,
    ChatPage,
    MyschedulePage 
  ],

  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: ''
    }),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig),
      BrowserModule,
      FormsModule,
      HttpModule,
      NgCalendarModule,
      DatePickerModule,
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    FoodPage,
    AccomodationPage,
    ActivityPage,
    ShoppingPage,
    SightseeingPage,
    ActivityPage,
    TransportationPage,
    StepsPage,
    ProfilePage,
    ToursListPage,
    LoginPage,
    RegisterPage,
    ResetPage,
    StepbriefPage,
    CompletedPage,
    CreateTourPage,
    StepdetailsPage,
    DetailPage,
    StepsummaryPage,
    HomepagePage,
    NotificationPage, 
    PlanPage,
    PlayDetPage,
    EditTourPage,
    UseralltoursPage,
    ChatPage,
    MyschedulePage 
  ],

  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},
      AuthService, DataService, Completed, Validateage]

})
export class AppModule {}
