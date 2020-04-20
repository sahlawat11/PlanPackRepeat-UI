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

  userInfo: User;
  pageMode = PageMode;
  pageType = PageMode.EDIT;
  isNewUser: boolean;

  profileForm = {
    fName: '',
    lName: '',
    email: '',
    phone: '',
    bio: '',
    adminUser: false
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
  /**
   * this should only be triggered if the user is a new user
   */
  if (!this.auth.checkIfTheUserIsExisting) {
    this.alerts.info("Welcome! To continue, please complete your profile.");
    this.pageType = this.pageMode.EDIT;
  } else {
    this.pageType = this.pageMode.READ;
  }
}

initUserProfile(): void {
  this.userService.getUserInfo(this.profileForm.email).subscribe((
    data: User
  ) => {
    console.log('this is the user info:', data);
    this.isNewUser = false;
    this.userInfo = data;
    this.loadingService.disableLoadingMask();
  },
  (error) => {
    console.log('Error:', error);
    if (error.status === 404) {
      this.isNewUser = true;
      this.pageType = this.pageMode.EDIT;
    } else {
      this.alerts.error('Error: Please try again by refreshing your browser.');
    }
    this.loadingService.disableLoadingMask();
  });
}

editProfile(): void {
  console.log('Edit profile has been clicked', this.pageType);
  this.pageType = this.pageMode.EDIT;
  this.profileForm = {
    fName: this.userInfo.firstName,
    lName: this.userInfo.lastName,
    email: this.userInfo.email,
    phone: this.userInfo.mobileNumber,
    bio: this.userInfo.biography,
    adminUser: this.userInfo.adminUser
  }
}

saveProfile(): void {
  this.alerts.success("Your changes are saved!")
  console.log('Saved the profile.');
}

completeProfileSetup(isSuperUser: boolean): void {
  console.log('Completing user setup');
  if (!this.auth.checkIfTheUserIsExisting) {
    this.profileForm.adminUser = isSuperUser;
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
    profileImageUrl: "",
    adminUser: this.profileForm.adminUser
  };
  this.userService.createUser(newUser).subscribe(
    (newUserData: User) => {
      this.loadingService.disableLoadingMask();
      this.alerts.success('Changes successfully saved!');
      this.pageType = this.pageMode.READ;
    },
    (error) => {
      this.alerts.error('An error occurred! Try saving again.');
      console.error('An error occurred while creating the new user:', error);
      this.loadingService.disableLoadingMask();
    }
  );
}

saveUserProfile(event) {
  if (!this.isFormValid()) {
    this.alerts.error('Please complete the form.');
    event.preventDefault();
    return;
  }
  const newUser: User =  {
    firstName: this.profileForm.fName,
    lastName: this.profileForm.lName,
    email: this.profileForm.email,
    mobileNumber: this.profileForm.phone,
    biography: this.profileForm.bio,
    adminUser: this.profileForm.adminUser
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

isFormValid(): boolean {
  for (let key in this.profileForm) {
    if (this.profileForm.hasOwnProperty(key)) {
      console.log('****************:', this.profileForm, key);
      if (typeof this.profileForm[key] === 'string' && (this.profileForm[key] === '' || this.profileForm[key].trim() === '')) {
        return false;
      }
    }
  }
  return true;
}

// get isNewUser() {
//   return this.auth.checkIfTheUserIsExisting;
// }

}

enum PageMode {
  EDIT, READ
}
