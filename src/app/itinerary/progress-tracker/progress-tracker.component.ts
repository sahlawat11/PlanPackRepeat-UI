import { Component, OnInit } from '@angular/core';
import { ItineraryService } from '../itinerary.service';
import { Itinerary } from 'src/app/models/itinerary';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-progress-tracker',
  templateUrl: './progress-tracker.component.html',
  styleUrls: ['./progress-tracker.component.scss']
})
export class ProgressTrackerComponent implements OnInit {

  itineraryobj: Itinerary;
  orderRoute: string;

  constructor(private itineraryService: ItineraryService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.init();
    this.initActivateRoute();
  }

  initActivateRoute() {
    this.orderRoute = this.router.url
    this.router.events.subscribe((val) => {
      // see also 
      console.log('************** this is the route change:', val);
      if (val instanceof NavigationEnd) {
        this.orderRoute = val.url;
      }
  });
  }

  goToStep(step: string) {
    console.log('This has been called', step);
    this.router.navigateByUrl(`/itinerary/create-itinerary/${step}`);
  }

  init(): void {
    console.log('THIS IS SET.................');
    this.itineraryService.itineraryStream.subscribe(
      (data: Itinerary) => {
        console.log('These are the updates received: progress tracker', data);
        this.itineraryobj = data;
        this.itineraryService.updateTrackerOptions();
      }
    );
  }

  get updatedTrackerOptions() {
    return this.itineraryService.trackerOptions;
  }



}
