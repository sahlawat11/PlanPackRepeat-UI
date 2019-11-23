import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ItineraryService } from '../itinerary.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  itineraryId: string;

  constructor(private activatedRoute: ActivatedRoute, private itineraryService: ItineraryService) { }

  ngOnInit() {
    console.log('THIS PAGE HAS BEEN EXECUTED');
    this.activatedRoute.params.subscribe((params: any) => {
      this.itineraryId = params.id;
      console.log('this is the params:', params, this.itineraryId);
    });
    this.getItineraryDetails();
  }

  getItineraryDetails() {
    this.itineraryService.getItineraryDetails(this.itineraryId).subscribe(
      (data: any) => {
        console.log('********* these are the details:', data);
      }
    );
  }

}
