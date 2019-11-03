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

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [InfoComponent, ProgressTrackerComponent, ItineraryBaseComponent, DistinationsComponent, SummaryComponent],
  providers: [ ItineraryService ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ItineraryRoutesModule,
    NgbModule
  ]
})
export class ItineraryModule { }