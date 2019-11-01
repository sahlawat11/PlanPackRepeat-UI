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
    public: new FormControl('')
  });

  isFormValid: boolean;

  constructor() { }

  ngOnInit() {
    this.itineraryInfoForm.valueChanges.subscribe((data) => {
      console.log('this value has been changed', data, this.itineraryInfoForm);
      this.isFormValid = this.itineraryInfoForm.valid;
    });
  }

  onSubmit() {
    console.log('this is the data:', this.itineraryInfoForm);
  }

  updateInput() {
    console.log('Update input has been called:', this.itineraryInfoForm.value);
  }

}
