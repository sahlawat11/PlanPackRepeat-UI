import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateItineraryComponent } from '../pages/create-itinerary/create-itinerary.component';
import { InfoComponent } from './info/info.component';

const createItineraryRoutes: Routes = [
  {
    path: 'info', component: InfoComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'info'
  }
];

@NgModule({
  imports: [ RouterModule.forChild(createItineraryRoutes) ],
  exports: [ RouterModule ]
})

export class ItineraryRoutesModule {}