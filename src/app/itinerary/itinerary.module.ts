import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoComponent } from './info/info.component';
import { ItineraryRoutesModule } from './itinerary.routes.module';



@NgModule({
  declarations: [InfoComponent],
  imports: [
    CommonModule,
    ItineraryRoutesModule
  ]
})
export class ItineraryModule { }
