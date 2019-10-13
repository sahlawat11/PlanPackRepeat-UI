import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivate, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  // providers: [ActivatedRouteSnapshot]
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) {
    this.authService.isAuthenticated$.subscribe(
      (loggedIn => {
        debugger;
        console.log('****', UrlTree, window.location.href);
        debugger;
        if (!loggedIn) {
            console.log('Need to stay here.');
        } else {
            this.router.navigateByUrl('/dashboard');
            return false;
        }
      })
    );
  }

  ngOnInit() {
  }

  login(): void {
    this.authService.login('/dashboard');
  }

}
