import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';

import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit() {
    console.log('*****************:', this.auth.loggedIn)
    this.auth.userProfile$.subscribe((data) => {
      console.log('this is a test:', data);
    });
    this.auth.isAuthenticated$.subscribe(
      (data) => {
        console.log('*******jh jsdfs :', data);
      },
      (error) => {
        console.log('An error occured:', error);
      }
    );
    if (this.auth.loggedIn) {
      this.router.navigateByUrl('/profile');
    }
  }
}
