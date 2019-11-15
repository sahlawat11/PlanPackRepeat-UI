import { Component, OnInit, ViewChild, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';

import { ItineraryService } from '../../itinerary/itinerary.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})

export class DialogComponent implements OnInit, AfterViewInit {

  @Output() openDialogEvent = new EventEmitter<any>();
  @Input() content: string;

  @ViewChild('googleDialog', {static: false}) googleDialog: any;

  public dialogRef: ReplaySubject<boolean> = new ReplaySubject(1);
  dialogRefStream = this.dialogRef.asObservable();

  googleDialogIsOpen = false;

  constructor(private itineraryService: ItineraryService) { }

  ngOnInit() {
    // setTimeout(() => {
    //   this.googleDialogIsOpen = true;
    //   console.log('THIS HAS RUN AFTER SETTIMEOUT:', this.googleDialogIsOpen);
    // }, 5000);
    this.dialogRefStream.subscribe((data: any) => {
      console.log('*************************:', data);
      this.googleDialogIsOpen = data;
    });
  }

  ngAfterViewInit(): void {
    this.openDialogEvent.emit(this.dialogRef);
  }

  saveMapsDestinations(): void {
    this.itineraryService.onSaveMapsLocationsSubject.next(true);
  }

}
