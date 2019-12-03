import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { Itinerary, Destinations, BackendDestination, BackendItinerary } from '../models/itinerary';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class ItineraryService {

  private itinerarySubject: ReplaySubject<Itinerary> = new ReplaySubject();
  public onSaveMapsLocationsSubject: ReplaySubject<boolean> = new ReplaySubject();

  itineraryStream = this.itinerarySubject.asObservable();
  onSaveMapsLocationsStream = this.onSaveMapsLocationsSubject.asObservable();

  savedDestinations: Array<Destinations> = [];
  editItinerary: boolean;

  trackerOptions = [
    {
      step: 'info',
      displayName: 'info',
      stepReady: true,
      section: 'info-progress',
      stepCompleted: false,
      showStep: true
    },
    {
      step: 'destinations',
      displayName: 'destinations',
      stepReady: false,
      section: 'destinations-progress',
      stepCompleted: false,
      showStep: true
    },
    {
      step: 'budget',
      displayName: 'budget & pictures',
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
              destination.streetAddress !== '' &&
              destination.time !== '') {
                // debugger;
                isValid = true;
              } else {
                // debugger;
                isValid = false;
                break;
              }
        }
        option.stepCompleted = isValid;
        option.stepReady = true;
      }

      if (option.step === 'budget' && this.itineraryObj.budget) {
        if (this.itineraryObj.budget > 0 && this.itineraryObj.photos && this.itineraryObj.photos.size > 0) {
          option.stepCompleted = true;
          option.stepReady = true;
        }

      }
    }
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
    // debugger;
    this.itinerarySubject.next(itineraryData);
  }

  saveItinerary(): Observable<any> {
    console.log('This is the itinerary object:', this.itineraryObj, this.userService.userEmail);
    // debugger;
    const payload: BackendItinerary = {
      itineraryName: this.itineraryObj.info.name,
      startDate: this.itineraryObj.info.startDate,
      endDate: this.itineraryObj.info.endDate,
      email: this.userService.userEmail,
      budgetId: this.itineraryObj.budget,
      destinations: [],
      active: true,
      public: this.itineraryObj.info.visiblity === 'Public' ? true : false,
      pictures: Array.from(this.itineraryObj.photos),
      visibilityKey: `e${Date.now().toString()}x`
    };

    this.itineraryObj.destinations.forEach((destination: Destinations) => {
      const dest: BackendDestination = {
        destName: destination.name,
        address: destination.streetAddress,
        // plannedTime: new Date(`${destination.date} ${destination.time}`),
        plannedTime: '2019-10-23 09:00:00',
        status: destination.status,
        imgUrl: '',
        latitude: destination.latitude ? destination.latitude.toString() : null,
        longitude: destination.longitude ? destination.longitude.toString() : null,
        source: destination.source
      };
      payload.destinations.push(dest);
    });

    return this.httpClient.post(`http://travelapp-env-1.ey2unjuyh7.us-east-1.elasticbeanstalk.com/itinerary/createItinerary`, payload);
  }


  getUiItineraryModelFromRaw(rawItineraryObj: any) {
    console.log('this is the raw object:', rawItineraryObj);
    const itineraryObjTemp =  {
      info: {
        name: rawItineraryObj.itineraryName,
        startDate: this.getDateHtmlDate(rawItineraryObj.startDate),
        endDate: this.getDateHtmlDate(rawItineraryObj.endDate),
        visiblity: rawItineraryObj.public ? 'Public' : 'Private',
      },
      destinations: [],
      budget: rawItineraryObj.budgetId
    };

    rawItineraryObj.destinations.forEach((destination) => {
      const destObj: Destinations = {
        name: destination.destName,
        streetAddress: destination.address,
        date: this.getDateHtmlDate(destination.plannedTime),
        time: this.getDateHtmlTime(destination.plannedTime),
        latitude: destination.latitude,
        longitude: destination.longitude,
        status: destination.status,
        source: destination.source
      };
      itineraryObjTemp.destinations.push(destObj);
    });
    return itineraryObjTemp;
  }

  getItineraryDetails(itineraryId: string) {
    return this.httpClient.get(`http://travelapp-env-1.ey2unjuyh7.us-east-1.elasticbeanstalk.com/itinerary/getItineraryById/${itineraryId}`);
  }

  getDateHtmlDate(date): string {
    const dateObj = new Date(date);
    return dateObj.getFullYear() + '-' + dateObj.getMonth() + '-' + dateObj.getDate();
  }

  getDateHtmlTime(date): string {
    const dateObj = new Date(date);
    return dateObj.getHours() + ':' + dateObj.getMinutes();
  }

  updateItinerary(itineraryId: string, payload: any): Observable<any> {
    return this.httpClient.put(`http://travelapp-env-1.ey2unjuyh7.us-east-1.elasticbeanstalk.com/itinerary/${itineraryId}`, payload);
  }

  getUserItineraries(userEmail: string): Observable<any> {
    // tslint:disable-next-line: max-line-length
    return this.httpClient.get(`http://travelapp-env-1.ey2unjuyh7.us-east-1.elasticbeanstalk.com/itinerary/getItineraryByEmail/${userEmail}`);
  }

  getAllItineraries(userEmail: string): Observable<any> {
    // tslint:disable-next-line: max-line-length
    return this.httpClient.get(`http://travelapp-env-1.ey2unjuyh7.us-east-1.elasticbeanstalk.com/itinerary/getAllItineraries`);
  }


}
