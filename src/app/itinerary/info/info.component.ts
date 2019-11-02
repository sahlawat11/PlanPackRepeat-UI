import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Info } from '../../models/itinerary-info';
import { ItineraryService } from '../itinerary.service';


@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  itineraryInfoForm = new FormGroup({
    name: new FormControl('', Validators.required),
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required),
    visibility: new FormControl('Public')
  });
  itineraryInfo: Info;
  isFormValid: boolean;
  today: string;
  itineraryUpdateTimeout: any;

  constructor(private router: Router, private itineraryService: ItineraryService) { }

  ngOnInit() {
    this.itineraryInfoForm.valueChanges.subscribe((data) => {
      this.updateInput();
      this.isFormValid = this.itineraryInfoForm.valid;
    });
    this.setTodaysDate();
  }

  onSubmit() {
    console.log('this is the data:', this.itineraryInfoForm);
    this.itineraryInfo = {
      name: this.itineraryInfoForm.value.name,
      startDate: this.itineraryInfoForm.value.startDate,
      endDate: this.itineraryInfoForm.value.endDate,
      visiblity: this.itineraryInfoForm.value.visibility
    };
    this.itineraryService.itineraryObj = {
      info: this.itineraryInfo
    }
    this.router.navigateByUrl('create-itinerary/destinations');
  }

  updateInput() {
    if (this.itineraryUpdateTimeout !== null) {
      clearTimeout(this.itineraryUpdateTimeout);
    }
    this.itineraryUpdateTimeout = setTimeout(() => {
      this.itineraryUpdateTimeout = null;
      this.setItineraryObj();
      console.log('Update input has been called:', this.itineraryInfoForm.value);
      this.itineraryService.broadcastUpdates(this.itineraryService.itineraryObj)
  }, 500)
}

  setItineraryObj() {
    this.itineraryInfo = {
      name: this.itineraryInfoForm.value.name,
      startDate: this.itineraryInfoForm.value.startDate,
      endDate: this.itineraryInfoForm.value.endDate,
      visiblity: this.itineraryInfoForm.value.visibility
    };
    this.itineraryService.itineraryObj = {
      info: this.itineraryInfo
    }
  }

  setTodaysDate() {
    let today = new Date();
    let dd = today.getDate().toString();
    let mm = (today.getMonth() + 1).toString(); // January is 0
    const yyyy = today.getFullYear();
    if (dd < '10') {
      dd = '0' + dd;
    }
    if (mm < '10') {
      mm = '0' + mm;
    }
    this.today = yyyy + '-' + mm + '-' + dd;
  }

}
