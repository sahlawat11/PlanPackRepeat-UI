import { PagerService } from './../../services/pager.service';

import { Itinerary, Destination } from './../../models/carouselmodels';
import { CarouselViewService } from './../../services/carousel-view.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ItineraryService } from '../../itinerary/itinerary.service';

@Component({
  selector: 'app-home-page-carousel-view',
  templateUrl: './home-page-carousel-view.component.html',
  styleUrls: ['./home-page-carousel-view.component.css']
})
export class HomePageCarouselViewComponent implements OnInit {

  filteredItinerary: Itinerary[] = [];
  pager: any = {};
  pagedItems: any[];

  constructor(private carouselService: CarouselViewService, private pagerService:PagerService,
    private userService: UserService, private itineraryService: ItineraryService) { }
    allitineraries: Itinerary[] = [];

  ngOnInit() {
    this.initCarousal();
    this.getUserItineraries();
  }

  initCarousal() {
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

  getUserItineraries() {
    console.log('********** checking this out:', this.userService.userEmail);
    this.itineraryService.getUserItineraries(this.userService.userEmail).subscribe(
      (data: any) => {
        console.log('THESE ARE THE USER ITINERARIES:', data);
      },
      (error: any) => {
        console.log('Error occurred while fetching the user itineraries:', error);
      });
  }

  setPage(page: number) {
    this.pager = this.pagerService.getPager(this.allitineraries.length, page);
    this.pagedItems = this.allitineraries.slice(this.pager.startIndex, this.pager.endIndex + 1);
    console.log('pagedItems are', this.pagedItems)
}

}
