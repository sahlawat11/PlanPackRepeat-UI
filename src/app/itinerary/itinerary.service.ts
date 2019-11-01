import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItineraryService {

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

  constructor() { }
}
