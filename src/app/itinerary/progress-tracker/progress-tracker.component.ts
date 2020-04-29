import { Component, OnInit, OnDestroy } from '@angular/core';
import { ItineraryService } from '../itinerary.service';
import { Itinerary } from 'src/app/models/itinerary';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-progress-tracker',
  templateUrl: './progress-tracker.component.html',
  styleUrls: ['./progress-tracker.component.scss']
})
export class ProgressTrackerComponent implements OnInit, OnDestroy {

  itineraryobj: Itinerary;
  orderRoute: string;
  subscriptions = new Subscription();

  constructor(private itineraryService: ItineraryService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.init();
    this.initActivateRoute();
  }

  initActivateRoute() {
    this.orderRoute = this.router.url;
    this.subscriptions.add(this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.orderRoute = val.url;
      }
  }));
  }

  goToStep(step: string) {
    console.log('This has been called', step);
    this.router.navigateByUrl(`/itinerary/create-itinerary/${step}`);
  }

  init(): void {
    this.subscriptions.add(this.itineraryService.itineraryStream.subscribe(
      (data: Itinerary) => {
        console.log('These are the updates received: progress tracker', data);
        this.itineraryobj = data;
        this.itineraryService.updateTrackerOptions();
      }
    ));
  }

  get updatedTrackerOptions() {
    return this.itineraryService.trackerOptions;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
