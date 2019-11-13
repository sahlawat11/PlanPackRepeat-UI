import { MessageService } from 'src/app/services/message.service';
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
    filteredItinerary: Itinerary[] = [];
    pager: any = {};
    pagedItems: any[];
  constructor(private carouselService: CarouselViewService, private pagerService:PagerService, private messageService:MessageService) { }
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

  getDetails(){
     /*
     this.messageService.getMessage().subscribe(textboxreader=>{
        console.log("value of the text is ",textboxreader.text)
        if(textboxreader.text){
          this.pager = this.pagerService.getPager(this.allitineraries.length, 1);
          this.pagedItems = this.allitineraries.slice(this.pager.startIndex, this.pager.endIndex + 1);
          return this.pagedItems;
        }else{
          console.log("data empty ")
        }
        console.log("data received is =>=> ",textboxreader.text)
        this.filteredItinerary = this.allitineraries.filter(v => v.getItineraryName() === textboxreader.text);
        this.pager = this.pagerService.getPager(this.filteredItinerary.length, 1);
        this.pagedItems = this.filteredItinerary.slice(this.pager.startIndex, this.pager.endIndex + 1);
        console.log("Page Items",this.pagedItems)
        //return this.pagedItems;
        return this.pagedItems;
     }, failure => {

     })
    */

  }
}
