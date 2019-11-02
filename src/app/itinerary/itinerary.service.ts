import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Itinerary } from '../models/itinerary';

@Injectable({
  providedIn: 'root'
})
export class ItineraryService {

  private itinerarySubject: BehaviorSubject<Itinerary> = new BehaviorSubject(<Itinerary>{});
  itineraryStream = this.itinerarySubject.asObservable();

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
