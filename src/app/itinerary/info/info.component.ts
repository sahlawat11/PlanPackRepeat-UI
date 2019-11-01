import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


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
    visibility: new FormControl('public')
  });

  isFormValid: boolean;
  today: string;


  constructor() { }

  ngOnInit() {
    this.itineraryInfoForm.valueChanges.subscribe((data) => {
      console.log('this value has been changed', data, this.itineraryInfoForm);
      this.isFormValid = this.itineraryInfoForm.valid;
    });

    this.setTodaysDate();

  }

  onSubmit() {
    console.log('this is the data:', this.itineraryInfoForm);
  }

  updateInput() {
    console.log('Update input has been called:', this.itineraryInfoForm.value);
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
