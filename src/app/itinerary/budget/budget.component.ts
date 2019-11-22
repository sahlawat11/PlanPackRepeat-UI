import { Component, OnInit } from '@angular/core';

import { ItineraryService } from '../itinerary.service';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit {

  itineraryUpdateTimeout: any;
  tripBudget: number;

  constructor(private itineraryService: ItineraryService) { }

  ngOnInit() {
  }

  get itineraryObj() {
    return this.itineraryService.itineraryObj;
  }

  updateBudget(value: number) {
    this.itineraryService.itineraryObj.budget = this.tripBudget;
    this.updateInput();
  }

  createItinerary() {
    console.log('************************* ajhadsfjgdshfsdgf:', this.itineraryService.itineraryObj);
    this.itineraryService.saveItinerary().subscribe(
      (itineraryData) => {
        console.log('this is it.........:', itineraryData);
      },
      error => {
        console.log('this is the error for post itinerary:', error);
      }
    );
  }


  updateInput() {
    if (this.itineraryUpdateTimeout !== null) {
      clearTimeout(this.itineraryUpdateTimeout);
    }
    this.itineraryUpdateTimeout = setTimeout(() => {
      this.itineraryUpdateTimeout = null;
      this.itineraryService.broadcastUpdates(this.itineraryService.itineraryObj);
  }, 500);
}

}
