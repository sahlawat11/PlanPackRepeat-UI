import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InfoComponent } from './info/info.component';
import { ItineraryRoutesModule } from './itinerary.routes.module';
import { ProgressTrackerComponent } from './progress-tracker/progress-tracker.component';
import { ItineraryBaseComponent } from './itinerary-base/itinerary-base.component';
import { ItineraryService } from './itinerary.service';

@NgModule({
  declarations: [InfoComponent, ProgressTrackerComponent, ItineraryBaseComponent],
  providers: [ ItineraryService ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ItineraryRoutesModule
  ]
})
export class ItineraryModule { }