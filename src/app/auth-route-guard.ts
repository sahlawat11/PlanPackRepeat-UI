import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class RouteGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService) { }

  canActivate(state: RouterStateSnapshot) {
    return this.authService.isAuthenticated$.pipe(
        tap(loggedIn => {
          if (!loggedIn) {
            this.authService.login(state.url);
          }
        })
      );
  }
}
