import { Component, OnInit } from '@angular/core';

import { ItineraryService } from '../itinerary.service';

@Component({
  selector: 'app-progress-tracker',
  templateUrl: './progress-tracker.component.html',
  styleUrls: ['./progress-tracker.component.scss']
})
export class ProgressTrackerComponent implements OnInit {

  trackerOptions: Array<any>;

  constructor(private itineraryService: ItineraryService) { }

  ngOnInit() {
    this.trackerOptions = this.itineraryService.trackerOptions;
  }

  goToStep() {
    console.log('This has been called');
  }



}
