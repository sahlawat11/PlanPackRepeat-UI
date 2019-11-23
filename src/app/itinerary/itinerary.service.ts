import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Itinerary, Destinations, BackendDestination, BackendItinerary } from '../models/itinerary';
import { UserService } from '../services/user.service';

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
            option.stepReady = true;
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
          option.stepReady = true;
      }

      if (option.step === 'budget' && this.itineraryObj.budget) {
        if (this.itineraryObj.budget > 0) {
          option.stepCompleted = true;
          option.stepReady = true;
        }
        
      }
    }
    console.log('THIS IS IT (****************):', this.trackerOptions);
  }
}

  constructor(private httpClient: HttpClient, private userService: UserService) {
   }

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

  saveItinerary(): Observable<any> {
    console.log('This is the itinerary object:', this.itineraryObj, this.userService.userEmail);
    const payload: BackendItinerary = {
      startDate: this.itineraryObj.info.startDate,
      endDate: this.itineraryObj.info.endDate,
      // startDate: '2019-11-28',
      // endDate: '2019-11-30',
      email: this.userService.userEmail,
      budgetId: this.itineraryObj.budget,
      destinations: [],
      active: true,
      public: true ? this.itineraryObj.info.visiblity === 'public' : false
    }

    this.itineraryObj.destinations.forEach((destination: Destinations) => {
      const dest: BackendDestination = {
        destName: destination.name,
        address: destination.streetAddress,
        // plannedTime: new Date(`${destination.date} ${destination.time}`),
        plannedTime: '2019-10-23 09:00:00',
        status: destination.status,
        imgUrl: '',
        latitude: destination.latitude ? destination.latitude.toString() : null,
        longitude: destination.longitude ? destination.longitude.toString() : null
      }
      payload.destinations.push(dest);
    });

    console.log('***************** this is the stuff I am submitting:', payload);

    return this.httpClient.post(`http://travelapp-env-1.ey2unjuyh7.us-east-1.elasticbeanstalk.com/itinerary/createItinerary`, payload);
  }

  getItineraryDetails(itineraryId: string) {
    return this.httpClient.get(`http://travelapp-env-1.ey2unjuyh7.us-east-1.elasticbeanstalk.com/itinerary/getItineraryById/${itineraryId}`);
  }


}
