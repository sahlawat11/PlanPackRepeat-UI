import { Itinerary, Destination } from '../models/carouselmodels';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarouselViewService {

  constructor(private authHttp: HttpClient) { }

  getItineraryInfoDashboard(email: string): Observable<any> {
     return this.authHttp.get(`http://localhost:5000/itinerary/getItineraryByEmail/saransh%40gmail.com`);
  }


}
