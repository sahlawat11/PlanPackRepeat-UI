import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { LoadingService } from '../../components/loading/loading.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileJson: string = null;

  constructor(public auth: AuthService, private loadingService: LoadingService, private alerts: ToastrService) { }

  ngOnInit() {
    this.auth.userProfile$.subscribe(
      profile => {
        // this.loadingService.enableLoadingMask();
        this.alerts.success('Success! Your profile has been loaded!');
        // this.loadingService.disableLoadingMask();
        this.profileJson = JSON.stringify(profile, null, 2)
  });
}

}
