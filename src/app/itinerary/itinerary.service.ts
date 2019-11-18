import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Itinerary, Destinations } from '../models/itinerary';

@Injectable({
  providedIn: 'root'
})
export class ItineraryService {

  private itinerarySubject: BehaviorSubject<Itinerary> = new BehaviorSubject(<Itinerary>{});
  public onSaveMapsLocationsSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);

  itineraryStream = this.itinerarySubject.asObservable();
  onSaveMapsLocationsStream = this.onSaveMapsLocationsSubject.asObservable();

  savedDestinations: Array<Destinations> = [];

  trackerOptions = [
    {
      step: 'info',
      stepReady: true,
      section: 'info-progress',
      stepCompleted: false,
      showStep: true
    },
    {
      step: 'destinations',
      stepReady: false,
      section: 'destinations-progress',
      stepCompleted: false,
      showStep: true
    },
    {
      step: 'budget',
      stepReady: false,
      section: 'budget-progress',
      stepCompleted: false,
      showStep: true
    },
    {
      step: 'submit',
      stepReady: false,
      section: 'submit-progress',
      stepCompleted: false,
      showStep: false
    }
  ];

  itineraryObj: Itinerary;

  updateTrackerOptions() {
    console.log('Tracker options have been called:', this.trackerOptions);
    if (this.itineraryObj) {
    for (const option of this.trackerOptions) {

      // info
      if (option.step === 'info' && this.itineraryObj.info) {
        if (this.itineraryObj.info.name &&
          this.itineraryObj.info.startDate &&
          this.itineraryObj.info.endDate &&
          this.itineraryObj.info.visiblity) {
            option.stepCompleted = true;

          }
      }

      if (option.step === 'destinations' && this.itineraryObj.destinations) {
        let isValid = false;
        for (const destination of this.itineraryObj.destinations) {
          // debugger;
          if (destination.date !== "" &&
              destination.name &&
              destination.source &&
              destination.streetAddress !== "" &&
              destination.time !== "") {
                // debugger;
                isValid = true;
              } else {
                // debugger;
                isValid = false;
                break;
              }
        };
          option.stepCompleted = isValid;
        
      }

      if (option.step === 'budget' && this.itineraryObj.budget) {
        if (this.itineraryObj.budget > 0) {
          option.stepCompleted = true;
        }
        
      }
    }
    console.log('THIS IS IT (****************):', this.trackerOptions);
  }
}

  constructor() { }

  isDestinationPageValid(): boolean {
    for (const option of this.trackerOptions) {
      if (option.step === 'destinations') {
        return option.stepCompleted;
      }
    }
  }

  broadcastUpdates(itineraryData: any): void {
    this.itineraryObj = itineraryData;
    this.itinerarySubject.next(itineraryData);
  }


}
