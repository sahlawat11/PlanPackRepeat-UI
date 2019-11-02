import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItineraryService } from '../itinerary.service';

@Component({
  selector: 'app-distinations',
  templateUrl: './distinations.component.html',
  styleUrls: ['./distinations.component.scss']
})
export class DistinationsComponent implements OnInit {

  constructor(private router: Router, private itineraryService: ItineraryService) { }

  ngOnInit() {
    this.validateItineraryObj();
    console.log('**************:', this.itineraryService.itineraryObj);
  }

  validateItineraryObj() {
    if (typeof this.itineraryService.itineraryObj === 'undefined') {
      this.router.navigateByUrl('/create-itinerary/info');
    }
  }

}
