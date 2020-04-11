import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from '../../services/user.service';
import { LoadingService } from '../../shared/loading/loading.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, AfterViewInit {

  @ViewChild('fName', { static: false }) fName: ElementRef<any>;

  pageMode = PageMode;
  pageType = PageMode.EDIT;

  profileForm = {
    fName: '',
    lName: '',
    email: '',
    phone: '',
    bio: '',
    superUser: false
  }

  constructor(public auth: AuthService, private loadingService: LoadingService, private alerts: ToastrService) { }

  ngOnInit() {
    this.loadingService.enableLoadingMask();
    this.auth.userProfile$.subscribe(
      profile => {
        if (profile) {
          this.profileForm.email = profile.email;
        }
        this.loadingService.disableLoadingMask();
  });
}

ngAfterViewInit() {
  if (!this.isNewUser) {
    this.alerts.info("Welcome! To continue, please complete your profile.");
  }
}

editProfile(): void {
  console.log('Edit profile has been clicked', this.pageType);
  this.pageType = this.pageMode.EDIT;
}

saveProfile(): void {
  this.alerts.success("Your changes are saved!")
  console.log('Saved the profile.');
}

completeProfileSetup(isSuperUser: boolean): void {
  console.log('Completing user setup');
  if (isSuperUser) {
    this.alerts.success('Changes successfully saved!');
    console.log(this.profileForm);

  } else {
    this.alerts.success('Changes successfully saved!');
  }
}

get isNewUser() {
  return this.auth.checkIfTheUserIsExisting;
}

}

enum PageMode {
  EDIT, READ
}
