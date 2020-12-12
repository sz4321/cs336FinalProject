import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

// The auth guard was done with the help of this link
// https://stackoverflow.com/questions/34331478/angular-redirect-to-login-page

export class AuthGuardService implements CanActivate{

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(sessionStorage.getItem('userName') && sessionStorage.getItem('passwordEntered')){
      console.log('true');
      return true;
    }

    this.router.navigate(['/log-in']);
    return false;
  }
}
