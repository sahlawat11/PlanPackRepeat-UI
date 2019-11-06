import { PagerService } from './../../services/pager.service';

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
    private allItems: any[];
    pager: any = {};
    pagedItems: any[];
  constructor(private carouselService: CarouselViewService, private pagerService:PagerService) { }
    allitineraries :  Itinerary[] = [];

  ngOnInit() {
    this.carouselService.getItineraryInfoDashboard('saransh@gmail.com', true).subscribe(
      (result : Array<any> ) => {
            const value_list= []
            result.forEach(itinerary => {
            const destArray= [];
            itinerary.destinations.forEach(destination => {
                  destArray.push(new Destination(destination.destName, destination.imgUrl));
            });
            const iti = new Itinerary(itinerary.id,itinerary.itineraryName, destArray);
            value_list.push(iti);
        });
        this.allitineraries=value_list
          console.log(this.allitineraries);
          this.setPage(1);

      }, (error) => {
           console.log('erroor is ', error);
      }
      );
  }

  setPage(page: number) {
    this.pager = this.pagerService.getPager(this.allitineraries.length, page);
    this.pagedItems = this.allitineraries.slice(this.pager.startIndex, this.pager.endIndex + 1);
    console.log("pagedItems are",this.pagedItems)
}
}
