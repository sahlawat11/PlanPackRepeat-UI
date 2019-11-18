import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InfoComponent } from './info/info.component';
import { ItineraryRoutesModule } from './itinerary.routes.module';
import { SharedModule } from '../shared/shared.module';
import { ProgressTrackerComponent } from './progress-tracker/progress-tracker.component';
import { ItineraryBaseComponent } from './itinerary-base/itinerary-base.component';
import { ItineraryService } from './itinerary.service';
import { DistinationsComponent } from './distinations/distinations.component';
import { SummaryComponent } from './summary/summary.component';
import { DialogComponent } from '../components/dialog/dialog.component';
import { GoogleMapsComponent } from '../components/google-maps/google-maps.component';
import { AgmCoreModule } from '@agm/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BudgetComponent } from './budget/budget.component';


@NgModule({
  declarations: [InfoComponent, ProgressTrackerComponent, ItineraryBaseComponent, DistinationsComponent, SummaryComponent, DialogComponent, GoogleMapsComponent, BudgetComponent],
  providers: [ ItineraryService],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ItineraryRoutesModule,
    NgbModule,
    SharedModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAzdiZyPOCqTWmA8g-WVGYFG5DuDAIsV4I',
      libraries: ['places']
    })
  ]
})
export class ItineraryModule { }