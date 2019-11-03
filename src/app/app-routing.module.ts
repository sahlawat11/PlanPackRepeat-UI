import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CallbackComponent } from './pages/callback/callback.component';
import { AuthGuard } from './auth/auth.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { GoogleMapsComponent } from './components/google-maps/google-maps.component';
import { ItineraryModule } from './itinerary/itinerary.module';

const routes: Routes = [
  {
    path: 'callback',
    component: CallbackComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  { path: 'create-itinerary',
    // children: [
    //   { path: '', loadChildren: './itinerary/itinerary.module#ItineraryModule' }
    // ]
    loadChildren: () => import('./itinerary/itinerary.module').then(m => m.ItineraryModule)
  },
  {
    path: 'maps',
    component: GoogleMapsComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }