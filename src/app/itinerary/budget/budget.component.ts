import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ItineraryService } from '../itinerary.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit, OnDestroy {

  itineraryUpdateTimeout: any;
  tripBudget: number;
  subscriptions = new Subscription();

  constructor(private itineraryService: ItineraryService, private alertService: ToastrService, private router: Router) { }

  ngOnInit() {
    this.tripBudget = this.itineraryService.itineraryObj.budget;
  }

  get itineraryObj() {
    return this.itineraryService.itineraryObj;
  }

  updateBudget(value: number) {
    
    this.itineraryService.itineraryObj.budget = value;
    this.updateInput();
  }

  createItinerary() {
    console.log('************************* ajhadsfjgdshfsdgf:', this.itineraryService.itineraryObj);
    this.subscriptions.add(this.itineraryService.saveItinerary().subscribe(
      (itineraryData) => {
        console.log('this is it.........:', itineraryData);
        this.alertService.success(`Itinerary ${this.itineraryObj.info.name} successfully created!`);
        this.router.navigateByUrl(`/itinerary/${itineraryData.id}`);
      },
      error => {
        console.log('this is the error for post itinerary:', error);
      }
    ));
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

ngOnDestroy() {
  this.subscriptions.unsubscribe();
}

}
