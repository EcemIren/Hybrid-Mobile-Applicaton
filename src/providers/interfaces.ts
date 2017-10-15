import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


/*
  Generated class for the Interfaces provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

//User tablosunu temsilen burada bir kullanıcı sınıfı yaratılıyor
export interface IUser {

    uid: string;
    username: string;
}

//Tour tablosunu temsilen burada bir sınıf yaratılıyor
export interface Tour {
    key: string;
    name: string;
    country: string;
    season: string;
    description: string;
    fee: number;
    user: IUser;
}

//Step tablosunu temsilen burada bir sınıf yaratılıyor
export interface IAction {
    key: string;
    title: string;
    name: string;
    category: string;
    cost: number;
    type: string;
    description: string;
    icon: string;
    latitude: string;
    longtitude: string;
    formattedAddress: string;
    tourId: string;
    tourName: string;
}


export interface Image {
    key: string;
    photoPath: string;
    stepId: string;
}

export interface PlannedTour  {
    key: string;
    uid: string;
    tourid: string;
    localDate: string;
}






