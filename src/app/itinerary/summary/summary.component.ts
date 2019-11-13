import { Component, OnInit } from '@angular/core';
import { ItineraryService } from '../itinerary.service';
import { Itinerary } from '../../models/itinerary';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  itineraryobj: Itinerary;

  constructor(private itineraryService: ItineraryService) { }

  ngOnInit() {
    this.init();
  }

  init(): void {
    this.itineraryService.itineraryStream.subscribe(
      (data: Itinerary) => {
        console.log('These are the updates received: summary', data);
        this.itineraryobj = data;
      }
    );
  }

}
