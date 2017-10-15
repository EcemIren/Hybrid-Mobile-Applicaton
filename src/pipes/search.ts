import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { ToursListPage } from '../pages/tours-list/tours-list';
/*
  Generated class for the Search pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
    name: 'search',
   

})
@Injectable()
export class SearchPipe implements PipeTransform {
    /*
      Takes a value and makes it lowercase.
     */
    transform(tourList: any, term: string): any {
        if (tourList === null)
            return null;





        return tourList.filter(function (item) {


            return item.country.toLowerCase().includes(term.toLowerCase()) ||
                item.name.toLowerCase().includes(term.toLowerCase());
             
                        
                
                
        })
  }
     


   
           
  

}
    

    


