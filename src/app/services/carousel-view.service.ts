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
      return this.authHttp.get('./../../mockjson/retrieveitinerary.json')
     ///return this.authHttp.get(`http://travelapp-env-1.ey2unjuyh7.us-east-1.elasticbeanstalk.com/itinerary/getItineraryByEmail/saransh%40gmail.com`);
  }


}
