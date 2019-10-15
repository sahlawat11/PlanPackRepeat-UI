import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { LoadingService } from '../../components/loading/loading.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileJson: string = null;

  constructor(public auth: AuthService, private loadingService: LoadingService) { }

  ngOnInit() {
    this.auth.userProfile$.subscribe(
      profile => {
        console.log('NOW THIS HAS BEEN ENVOKED:', profile);
        this.loadingService.enableLoadingMask();
        setTimeout(() => {
          this.loadingService.disableLoadingMask();
          this.profileJson = JSON.stringify(profile, null, 2)

        }, 5000);
    
  });
}

}
