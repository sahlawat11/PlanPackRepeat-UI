import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { LoadingService } from '../../shared/loading/loading.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  pageMode = PageMode;
  pageType = PageMode.EDIT;

  constructor(public auth: AuthService, private loadingService: LoadingService, private alerts: ToastrService) { }

  ngOnInit() {
    this.loadingService.enableLoadingMask();
    this.auth.userProfile$.subscribe(
      profile => {
        // this.alerts.success('Success! Your profile has been loaded!');
        console.log('THIS IS A MESSAGE:', profile);
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
}

enum PageMode {
  EDIT, READ
}
