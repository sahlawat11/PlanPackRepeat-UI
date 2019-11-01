import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoComponent } from './info/info.component';
import { ItineraryRoutesModule } from './itinerary.routes.module';
import { ProgressTrackerComponent } from './progress-tracker/progress-tracker.component';
import { ItineraryBaseComponent } from './itinerary-base/itinerary-base.component';

@NgModule({
  declarations: [InfoComponent, ProgressTrackerComponent, ItineraryBaseComponent],
  imports: [
    CommonModule,
    ItineraryRoutesModule
  ]
})
export class ItineraryModule { }