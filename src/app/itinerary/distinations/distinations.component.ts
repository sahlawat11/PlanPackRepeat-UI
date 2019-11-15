import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ItineraryService } from '../itinerary.service';
import { Destinations } from '../../models/itinerary';
import { LoadingService } from '../../shared/loading/loading.service';
import { Destination } from 'src/app/models/carouselmodels';

@Component({
  selector: 'app-distinations',
  templateUrl: './distinations.component.html',
  styleUrls: ['./distinations.component.scss']
})
export class DistinationsComponent implements OnInit {

  itineraryDestinationsForm = new FormGroup({
    name: new FormControl('', Validators.required),
    streetAddress: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    time: new FormControl('', Validators.required)
  });
  
  itineraryUpdateTimeout: any;
  isFormValid: boolean;
  isCollapsed = false;
  destinationsArr: Array<Destinations> = [];
  dialogRef: any;

  constructor(
    private router: Router,
    private itineraryService: ItineraryService,
    private loadingService: LoadingService
  ) {
  }

  ngOnInit() {
    this.validateItineraryObj();
    this.itineraryDestinationsForm.valueChanges.subscribe((data) => {
      this.updateInput();
      this.isFormValid = this.itineraryDestinationsForm.valid;
    });
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
  debugger;
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
  }

  removeDestination(index: number) {
    this.itineraryService.savedDestinations.splice(index, 1);
  }

  validateItineraryObj() {
    if (typeof this.itineraryService.itineraryObj === 'undefined') {
      this.router.navigateByUrl('/create-itinerary/info');
    }
  }

  openMapsDialog() {
    this.dialogRef.next(true);
  }

  setDialogRef(event) {
    console.log('this is set', event);
    this.dialogRef = event;
  }

  updateDestinationMetadata(destinationObj: Destination, attr: string, value) {
    debugger;
    destinationObj[attr] = value;
    debugger;
  }

  get savedDestinations(): Array<Destinations> {
    return this.itineraryService.savedDestinations;
  }
}
