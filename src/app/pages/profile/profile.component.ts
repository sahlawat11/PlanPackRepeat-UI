import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from '../../services/user.service';
import { LoadingService } from '../../shared/loading/loading.service';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/new-user';

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

  constructor(public auth: AuthService, private loadingService: LoadingService, private alerts: ToastrService, private userService: UserService) { }

  ngOnInit() {
    this.loadingService.enableLoadingMask();
    this.auth.userProfile$.subscribe(
      profile => {
        if (profile) {
          this.profileForm.email = profile.email;
          this.initUserProfile();
        }
  });
}

ngAfterViewInit() {
  if (!this.isNewUser) {
    this.alerts.info("Welcome! To continue, please complete your profile.");
  }
}

initUserProfile(): void {
  this.userService.getUserInfo(this.profileForm.email).subscribe((
    data
  ) => {
    console.log('this is the user info:', data);
    this.loadingService.disableLoadingMask();
  },
  (error) => {
    console.log('Error:', error);
    this.loadingService.disableLoadingMask();
  });
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
  if (!this.auth.checkIfTheUserIsExisting) {
    console.log(this.profileForm);
    this.createNewUser();
  } else {
    this.alerts.success('Changes successfully saved!');
  }
}

createNewUser() {
  const newUser: User =  {
    firstName: this.profileForm.fName,
    lastName: this.profileForm.lName,
    email: this.profileForm.email,
    mobileNumber: this.profileForm.phone,
    biography: this.profileForm.bio,
    favtDest: "",
    smdetails: [],
    profileImageUrl: ""
    // superUser: this.profileForm.superUser;
  };
  this.userService.createUser(newUser).subscribe(
    (newUserData: User) => {
      this.loadingService.disableLoadingMask();
      this.alerts.success('Changes successfully saved!');
    },
    (error) => {
      this.alerts.error('An error occurred! Try saving again.');
      console.error('An error occurred while creating the new user:', error);
      this.loadingService.disableLoadingMask();
    }
  );
}

saveUserProfile() {
  const newUser: User =  {
    firstName: this.profileForm.fName,
    lastName: this.profileForm.lName,
    email: this.profileForm.email,
    mobileNumber: this.profileForm.phone,
    biography: this.profileForm.bio,
    // superUser: this.profileForm.superUser;
  };
  this.userService.updateUser(newUser).subscribe(
    (newUserData: User) => {
      this.loadingService.disableLoadingMask();
      this.alerts.success('Changes successfully saved!');
    },
    (error) => {
      this.alerts.error('An error occurred! Try saving again.');
      console.error('An error occurred while creating the new user:', error);
      this.loadingService.disableLoadingMask();
    }
  );
}

get isNewUser() {
  return this.auth.checkIfTheUserIsExisting;
}

}

enum PageMode {
  EDIT, READ
}
