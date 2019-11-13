import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InfoComponent } from './info/info.component';
import { ItineraryRoutesModule } from './itinerary.routes.module';
import { ProgressTrackerComponent } from './progress-tracker/progress-tracker.component';
import { ItineraryBaseComponent } from './itinerary-base/itinerary-base.component';
import { ItineraryService } from './itinerary.service';
import { DistinationsComponent } from './distinations/distinations.component';
import { SummaryComponent } from './summary/summary.component';
import { DialogComponent } from '../components/dialog/dialog.component';
import { GoogleMapsComponent } from '../components/google-maps/google-maps.component';
import { AgmCoreModule } from '@agm/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [InfoComponent, ProgressTrackerComponent, ItineraryBaseComponent, DistinationsComponent, SummaryComponent, DialogComponent, GoogleMapsComponent],
  providers: [ ItineraryService ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ItineraryRoutesModule,
    NgbModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAzdiZyPOCqTWmA8g-WVGYFG5DuDAIsV4I',
      libraries: ['places']
    })
  ]
})
export class ItineraryModule { }
