
import { Itinerary, Destination } from './../../models/carouselmodels';
import { CarouselViewService } from './../../services/carousel-view.service';
import { Component, OnInit } from '@angular/core';
import {jsonString} from '../../../mockjson/retrieveitinerary'
import { error } from 'util';
@Component({
  selector: 'app-home-page-carousel-view',
  templateUrl: './home-page-carousel-view.component.html',
  styleUrls: ['./home-page-carousel-view.component.css']
})
export class HomePageCarouselViewComponent implements OnInit {

  constructor(private carouselService: CarouselViewService) { }
  itineraries :  Itinerary[] = [];

  ngOnInit() {
    this.carouselService.getItineraryInfoDashboard('saransh@gmail.com').subscribe(
      (result : Array<any> ) => {
            console.log(typeof(result),result)
            result.forEach(itinerary => {
            const destArray= [];
            itinerary.destinations.forEach(destination => {
                  destArray.push(new Destination(destination.destName, destination.imgUrl));
            });
            const iti = new Itinerary(itinerary.id,itinerary.itineraryName, destArray);
            this.itineraries.push(iti);
        });

          console.log(this.itineraries);

      }, (error) => {
           console.log('erroor is ', error);
      }
      );
  }


}
