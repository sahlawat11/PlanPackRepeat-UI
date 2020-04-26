import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/new-user';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '../../shared/loading/loading.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  userProfileJson: any;

  constructor(private authService: AuthService, private userService: UserService,
    private alerts: ToastrService, private loadingService: LoadingService) { }

  ngOnInit() {
    if (this.authService.checkIfTheUserIsExisting) {
      this.authService.userProfile$.subscribe(
        profile => {
          this.userProfileJson = JSON.stringify(profile, null, 2);
          if (typeof profile !== 'undefined') {
            this.userService.getUserInfo(profile.email).subscribe(
              (userData) => {
                this.alerts.success('Welcome to Plan Pack Repeat!');
                this.loadingService.disableLoadingMask();
              }, (error) => {
                if (error.status === 404) {
                  console.error('An error occurred while creating the new user:', error);

                }
              }
            );
          }
        }
        );
    }
  }

}
