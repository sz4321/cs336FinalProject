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
    //set the session storage with user name and if password was entered 
    if(sessionStorage.getItem('userName') && sessionStorage.getItem('passwordEntered')){
      return true;
    }

    //other wise go back to login 
    this.router.navigate(['/log-in']);
    return false;
  }
}
