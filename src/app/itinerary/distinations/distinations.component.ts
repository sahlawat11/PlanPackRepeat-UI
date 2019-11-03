import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItineraryService } from '../itinerary.service';
import { Destinations } from '../../models/itinerary';
import { AuthService } from '../../auth/auth.service';



@Component({
  selector: 'app-distinations',
  templateUrl: './distinations.component.html',
  styleUrls: ['./distinations.component.scss']
})
export class DistinationsComponent implements OnInit {

  isCollapsed = false;
  destinationsArr: Array<Destinations> = [];

  constructor(private router: Router, private itineraryService: ItineraryService, private auth: AuthService) { }

  ngOnInit() {
    // this.validateItineraryObj();
    console.log('**************:', this.itineraryService.itineraryObj);
  }

  addManualDestination() {
    const destObj: Destinations = {
      name: '',
      address1: '',
      address2: '',
      date: '',
      time: ''
    }
    this.destinationsArr.push(destObj);
  }



  validateItineraryObj() {
    if (typeof this.itineraryService.itineraryObj === 'undefined') {
      this.router.navigateByUrl('/create-itinerary/info');
    }
  }

}
