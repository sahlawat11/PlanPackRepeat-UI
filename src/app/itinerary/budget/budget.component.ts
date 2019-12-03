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
    this.validateItineraryObj();
    this.tripBudget = this.itineraryService.itineraryObj.budget;
  }

  validateItineraryObj() {
    if (typeof this.itineraryService.itineraryObj === 'undefined' ||
    typeof this.itineraryService.itineraryObj.destinations === 'undefined') {
      this.router.navigateByUrl('/itinerary/create-itinerary/info');
    }
  }

  get itineraryObj() {
    return this.itineraryService.itineraryObj;
  }

  updateBudget(value: number) {
    this.itineraryService.itineraryObj.budget = value;
    this.updateInput();
  }

  createItinerary() {
    this.subscriptions.add(this.itineraryService.saveItinerary().subscribe(
      (itineraryData) => {
        this.alertService.success(`Itinerary ${this.itineraryObj.info.name} successfully created!`);
        delete this.itineraryService.itineraryObj;
        this.router.navigateByUrl(`/itinerary/${itineraryData.id}`);
      },
      error => {
        console.log('this is the error for post itinerary:', error);
        this.alertService.error('Sorry your itinerary could not be created. Please try again.');
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

addPicturesSource(uploadedFilesSource: Array<string>) {
  uploadedFilesSource.forEach((fileSource: string) => {
    if (typeof this.itineraryObj.photos !== 'undefined') {
      this.itineraryObj.photos.add(fileSource);
    } else {
      this.itineraryObj.photos = new Set();
      this.itineraryObj.photos.add(fileSource);
    }
  });
}

ngOnDestroy() {
  this.subscriptions.unsubscribe();
}

}
