import { PagerService } from './../../services/pager.service';

import { Itinerary, Destination } from './../../models/carouselmodels';
import { CarouselViewService } from './../../services/carousel-view.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ItineraryService } from '../../itinerary/itinerary.service';


@Component({
  selector: 'app-home-page-carousel-view',
  templateUrl: './home-page-carousel-view.component.html',
  styleUrls: ['./home-page-carousel-view.component.scss']
})
export class HomePageCarouselViewComponent implements OnInit {

  filteredItinerary: Itinerary[] = [];
  pager: any = {};
  pagedItems: any[];
  userItineraries: Array<any> = [];
  // uiUserItinerarues: Array<any> = [];

  constructor(
    private carouselService: CarouselViewService,
    private pagerService: PagerService,
    private userService: UserService,
    private itineraryService: ItineraryService,
    private router: Router
  ) {}
  allitineraries: Itinerary[] = [];

  ngOnInit() {
    this.initCarousal();
    // this.getUserItineraries();
  }

  initCarousal() {
    this.carouselService
      .getItineraryInfoDashboard('saransh@gmail.com', true)
      .subscribe(
        (result: Array<any>) => {
          const value_list = [];
          result.forEach(itinerary => {
            const destArray = [];
            itinerary.destinations.forEach(destination => {
              destArray.push(
                new Destination(destination.destName, destination.imgUrl)
              );
            });
            const iti = new Itinerary(
              itinerary.id,
              itinerary.itineraryName,
              itinerary.pictures,
              destArray
            );
            value_list.push(iti);
          });
          this.allitineraries = value_list;
          console.log(this.allitineraries);
          this.setPage(1);
          this.getUserItineraries();
        },
        error => {
          console.log('erroor is ', error);
        }
      );
  }

  getUserItineraries() {
    console.log('********** checking this out:', this.userService.userEmail);
    this.itineraryService
      .getUserItineraries(this.userService.userEmail)
      .subscribe(
        (data: any) => {
          console.log('THESE ARE THE USER ITINERARIES:', data);
          // this.userItineraries.push(data);
          this.parseRawItineraryModelToUIModel(data);
          this.pagedItems = this.userItineraries.concat(this.pagedItems);
          // this.pagedItems = this.userItineraries;
          console.log('###################:', this.pagedItems);
        },
        (error: any) => {
          console.log(
            'Error occurred while fetching the user itineraries:',
            error
          );
        }
      );
  }

  setPage(page: number) {
    this.pager = this.pagerService.getPager(this.allitineraries.length, page);
    // this.pagedItems = this.allitineraries.slice(
    //   this.pager.startIndex,
    //   this.pager.endIndex + 1
    // );
    this.pagedItems = this.allitineraries;
    console.log('pagedItems are*******************', JSON.stringify(this.pagedItems));
  }

  parseRawItineraryModelToUIModel(userItineraries: Array<any>) {
    console.log('Before parsing the data:', userItineraries);
    userItineraries.forEach((itinerary: any) => {
      const uiHomePageItinObj = {
        itineraryId: itinerary.id,
        itineraryName: itinerary.itineraryName,
        destinations: itinerary.destinations,
        pictures: itinerary.pictures,
        likes: itinerary.likes,
        tripDuration: this.getNumberOfDays(itinerary.startDate, itinerary.endDate)
      }
      this.userItineraries = this.userItineraries.concat([uiHomePageItinObj]).reverse();
    });
  }


getNumberOfDays(date1, date2) {
  console.log('startd date:', date1, date2);
  const dateObj1 = new Date(date1);
  const dateObj2 = new Date(date2);

  const utc1 = Date.UTC(dateObj1.getFullYear(), dateObj1.getMonth(), dateObj1.getDate());
  const utc2 = Date.UTC(dateObj2.getFullYear(), dateObj2.getMonth(), dateObj2.getDate());
  const result = Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));
  if (typeof result === 'number') {
    return result;
  } else {
    return "";
  }
}

goToItineraryDetails(id: string) {
  if (id) {
    this.router.navigateByUrl(`/itinerary/${id}`);
  }
}

}

// parseRawDestinationsModelToUIModel(destinations: Array<any>) {
//   let resultDest = [];
//   destinations.forEach((destination: any) => {
//     const destTempObj = {
//       destinationName: destination.destName,

//     }
//   });
// }
