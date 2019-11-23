import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewUser } from '../models/new-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userEmail: string;

  constructor(private authHttp: HttpClient) { }


  getUserInfo(email: string): Observable<any> {
      this.userEmail = email;
      return this.authHttp.get(`http://travelapp-env-1.ey2unjuyh7.us-east-1.elasticbeanstalk.com/users/getUserByEmail/${email}`);
  }

  createUser(userInfo: NewUser) {
    console.log('this is the user info:', userInfo);
    return this.authHttp.post(`http://travelapp-env-1.ey2unjuyh7.us-east-1.elasticbeanstalk.com/users/createuser`, userInfo);
  }

}
