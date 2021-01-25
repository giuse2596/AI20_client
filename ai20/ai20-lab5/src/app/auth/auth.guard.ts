import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  url: string;

  constructor(private authService: AuthService, private router: Router){
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkLogin(state.url);
  }

  checkLogin(url: string){
    if(!this.authService.isLogged()){
//      this.authService.redirectUrl = url;
      this.authService.logout();
      this.router.navigate(['/home'], {queryParams: { doLogin: true }});
      return false;
    }
    return true;
  }
}
