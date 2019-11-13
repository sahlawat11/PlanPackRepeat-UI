import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  array = [1,2]

  constructor(private auth: AuthService) {}

  ngOnInit() {
    // On initial load, check authentication state with authorization server
    // Set up local auth streams if user is already authenticated
    this.auth.localAuthSetup();
  }

}
