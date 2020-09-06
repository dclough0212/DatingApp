import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private notify: AlertifyService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.auth.loggedIn()) {
      return true;
    }

    this.notify.error('Though shalt not pass!!');
    this.router.navigate(['/home']);
    return false;
  }

}
