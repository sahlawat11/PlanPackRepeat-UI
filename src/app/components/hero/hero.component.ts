import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from '../../services/user.service';
import { NewUser } from '../../models/new-user';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  userProfileJson: any;

  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit() {
    // debugger;
    console.log('****:', this.authService.checkIfTheUserIsExisting);
    if (this.authService.checkIfTheUserIsExisting) {
      this.authService.userProfile$.subscribe(
        profile => {
          console.log('NOW THIS HAS BEEN ENVOKED:', profile);
          this.userProfileJson = JSON.stringify(profile, null, 2);
        
          if (typeof profile !== 'undefined') {
            // debugger;
            this.userService.getUserInfo(profile.email).subscribe(
              (userData) => {
                console.log('User data:', userData);
              }, (error) => {
                // debugger;
                if (error.status === 404) {
                  console.log('*************:', profile);
                  const newUser: NewUser =  {
                    firstName: profile.given_name,
                    lastName: profile.family_name,
                    email: profile.email
                  };
                  this.userService.createUser(newUser).subscribe(
                    (newUserData: NewUser) => {
                      console.log('THIS IS THE NEW USER', newUserData);
                    },
                    (error) => {
                      console.error('An error occured while creating the new user:', error);
                    }
                  );
                }
              }
            );
          }

        }          
          

          
        );
    }
  }

}
