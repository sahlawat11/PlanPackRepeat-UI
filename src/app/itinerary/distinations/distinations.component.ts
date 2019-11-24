import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ItineraryService } from '../itinerary.service';
import { Destinations } from '../../models/itinerary';
import { Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';

@Component({
  selector: 'app-distinations',
  templateUrl: './distinations.component.html',
  styleUrls: ['./distinations.component.scss']
})
export class DistinationsComponent implements OnInit, OnDestroy {

  itineraryDestinationsForm = new FormGroup({
    name: new FormControl('', Validators.required),
    streetAddress: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    time: new FormControl('', Validators.required)
  });
  
  itineraryUpdateTimeout: any;
  // isFormValid: boolean;
  isCollapsed = false;
  destinationsArr: Array<Destinations> = [];
  dialogRef: any;
  subscriptions = new Subscription();

  constructor(
    private router: Router,
    private itineraryService: ItineraryService,
  ) {
  }

  ngOnInit() {
    this.validateItineraryObj();
    this.subscriptions.add(this.itineraryDestinationsForm.valueChanges.pipe(skip(1)).subscribe((data) => {
      debugger;
      this.updateInput();
    }));
    if (this.itineraryService.itineraryObj && this.itineraryService.itineraryObj.destinations) {
      debugger;
      this.itineraryService.savedDestinations = this.itineraryService.itineraryObj.destinations;
      console.log('THESE ARE THE DESTINATIONS THAT HAVE BEEN SET:', this.itineraryService.savedDestinations);
    }
  }

  updateInput() {
    if (this.itineraryUpdateTimeout !== null) {
      clearTimeout(this.itineraryUpdateTimeout);
    }
    this.itineraryUpdateTimeout = setTimeout(() => {
      this.itineraryUpdateTimeout = null;
      this.setItineraryObj();
      console.log('Update input has been called:', this.itineraryDestinationsForm.value);
      this.itineraryService.broadcastUpdates(this.itineraryService.itineraryObj)
  }, 500)
}

setItineraryObj() {
  this.itineraryService.itineraryObj.destinations = this.itineraryService.savedDestinations;
}

  addManualDestination() {
    const destObj: Destinations = {
      name: '',
      streetAddress: '',
      date: '',
      time: '',
      source: "manual",
      latitude: null,
      longitude: null
    };
    this.itineraryService.savedDestinations.push(destObj);
    this.itineraryService.broadcastUpdates(this.itineraryService.itineraryObj);
  }

  removeDestination(index: number) {
    this.itineraryService.savedDestinations.splice(index, 1);
  }

  validateItineraryObj() {
    if (typeof this.itineraryService.itineraryObj === 'undefined') {
      this.router.navigateByUrl('/itinerary/create-itinerary/info');
    }
  }

  openMapsDialog() {
    this.dialogRef.next(true);
  }

  setDialogRef(event) {
    console.log('this is set', event);
    this.dialogRef = event;
  }

  updateDestinationMetadata(destinationObj: Destinations, attr: string, value) {
    destinationObj[attr] = value;
  }

  get savedDestinations(): Array<Destinations> {
    console.log('************** THIS IS A TEST FOR THESE VALUES:', this.itineraryService.savedDestinations);
    return this.itineraryService.savedDestinations;
  }

  get isFormValid() {
    return this.itineraryService.isDestinationPageValid();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
