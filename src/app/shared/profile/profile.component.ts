import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  constructor(public auth: AuthService) {
    debugger;
  }

  ngOnInit() {
    this.auth.userProfile$.subscribe(data => {
      console.log('*****:', data);
    });
  }

}
