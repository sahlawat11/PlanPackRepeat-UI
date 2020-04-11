import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private authHttp: HttpClient) { }

  updateProfileInfo(email: string): Observable<any> {
    return this.authHttp.get(`https://travelapp-env-1.ey2unjuyh7.us-east-1.elasticbeanstalk.com/users/getUserByEmail/${email}`); 
  }

}
