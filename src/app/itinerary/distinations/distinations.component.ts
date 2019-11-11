import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItineraryService } from '../itinerary.service';
import { Destinations } from '../../models/itinerary';
import { AuthService } from '../../auth/auth.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-distinations',
  templateUrl: './distinations.component.html',
  styleUrls: ['./distinations.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class DistinationsComponent implements OnInit {
  isCollapsed = false;
  destinationsArr: Array<Destinations> = [];
  dialogRef: any;

  constructor(
    private router: Router,
    private itineraryService: ItineraryService,
    private auth: AuthService,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
    config.size = 'xl'
  }

  ngOnInit() {
    // this.validateItineraryObj();
    console.log('**************:', this.itineraryService.itineraryObj);
  }

  addManualDestination() {
    const destObj: Destinations = {
      name: '',
      address1: '',
      address2: '',
      date: '',
      time: ''
    };
    this.destinationsArr.push(destObj);
  }

  removeDestination(index: number) {
    this.destinationsArr.splice(index, 1);
  }

  validateItineraryObj() {
    if (typeof this.itineraryService.itineraryObj === 'undefined') {
      this.router.navigateByUrl('/create-itinerary/info');
    }
  }

  openMapsDialog() {
    this.modalService.open(this.dialogRef);
  }

  setDialogRef(event) {
    console.log('this is set', event);
    this.dialogRef = event;
  }
}
