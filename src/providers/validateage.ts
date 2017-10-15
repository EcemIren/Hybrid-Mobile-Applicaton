import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { FormControl } from '@angular/forms';
 
/*
  Generated class for the Validateage provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Validateage {

  constructor(public http: Http) {
    console.log('Hello Validateage Provider');
  }

   static isValid(control: FormControl): any {
 
        if(isNaN(control.value)){
            return {
                "not a number": true
            };
        }
    return null;

  }
}
