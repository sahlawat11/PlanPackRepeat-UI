import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateItineraryComponent } from '../pages/create-itinerary/create-itinerary.component';
import { InfoComponent } from './info/info.component';
import { ProgressTrackerComponent } from './progress-tracker/progress-tracker.component';
import { ItineraryBaseComponent } from './itinerary-base/itinerary-base.component';

const createItineraryRoutes: Routes = [

  { path: '', component: ItineraryBaseComponent,
  children: [
    { path: '', component: ProgressTrackerComponent, outlet: 'progress tracker' },
    { path: 'info', component: InfoComponent }
      
    
  ]
}
// ,
//   {
//     path: '',
//     pathMatch: 'full',
//     redirectTo: 'info'
//   }
];

@NgModule({
  imports: [ RouterModule.forChild(createItineraryRoutes) ],
  exports: [ RouterModule ]
})

export class ItineraryRoutesModule {}