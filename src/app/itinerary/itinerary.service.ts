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

  constructor() { }



  broadcastUpdates(itineraryData: any): void {
    this.itinerarySubject.next(itineraryData);
  }


}
