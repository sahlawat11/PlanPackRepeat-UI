import { Component, OnInit } from '@angular/core';

import { ItineraryService } from '../itinerary.service';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit {

  itineraryUpdateTimeout: any;

  constructor(private itineraryService: ItineraryService) { }

  ngOnInit() {
  }

  get itineraryObj() {
    return this.itineraryService.itineraryObj;
  }

  updateBudget(value: number) {
    this.itineraryObj.budget = value;
    this.updateInput();
  }

  updateInput() {
    if (this.itineraryUpdateTimeout !== null) {
      clearTimeout(this.itineraryUpdateTimeout);
    }
    this.itineraryUpdateTimeout = setTimeout(() => {
      this.itineraryUpdateTimeout = null;
      this.itineraryService.broadcastUpdates(this.itineraryService.itineraryObj)
  }, 500)
}

}
