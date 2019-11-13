import { Component, OnInit } from '@angular/core';

import { ItineraryService } from '../itinerary.service';
import { Itinerary } from 'src/app/models/itinerary';

@Component({
  selector: 'app-progress-tracker',
  templateUrl: './progress-tracker.component.html',
  styleUrls: ['./progress-tracker.component.scss']
})
export class ProgressTrackerComponent implements OnInit {

  trackerOptions: Array<any>;
  itineraryobj: Itinerary;

  constructor(private itineraryService: ItineraryService) { }

  ngOnInit() {
    this.trackerOptions = this.itineraryService.trackerOptions;
    this.init();
  }

  goToStep() {
    console.log('This has been called');
  }

  init(): void {
    this.itineraryService.itineraryStream.subscribe(
      (data: Itinerary) => {
        console.log('These are the updates received: progress tracker', data);
        this.itineraryobj = data;
      }
    );
  }



}
