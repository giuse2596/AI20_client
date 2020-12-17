import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from './login-dialog.component';
import * as moment from 'moment';
import { Router } from '@angular/router';
import {SignupComponent} from './signup.component';
import {ProfileComponent} from './profile.component';



const hostname = '/server';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private jwt;
  user: User;
  logged = false;
  redirectUrl: string;

  constructor(private http: HttpClient, private router: Router) { }

  login(user: User, dialog: MatDialogRef<LoginDialogComponent>){
    localStorage.clear();
    user.username = user.email.split('@')[0];
    this.http.post<any>(hostname + '/auth/login', user).subscribe(
      res => {
        console.log(res);
        this.jwt = JSON.parse(atob(res.token.split('.')[1]));
        localStorage.setItem('jwt', res.token);
        this.user = res.user;
        this.user.token = this.jwt;
        console.log(this.jwt);
        this.logged = true;
        dialog.close(this.logged);
        if (this.redirectUrl){
          this.router.navigate([this.redirectUrl]);
        }
      },
      err => {
        console.log(err.message);
        this.logged = false;
        dialog.close(this.logged);
      }
    );
  }

  signup(user: User, dialog: MatDialogRef<SignupComponent>){
    console.log(user);
    localStorage.clear();
    this.http.post<any>( hostname + '/register', user).subscribe(
      res => {
        dialog.close(true);
        if (this.redirectUrl){
          this.router.navigate([this.redirectUrl]);
        }
      },
      err => {
        dialog.close(false);
      }
    );
  }

  logout(){
    this.user = null;
    localStorage.removeItem('jwt');
    this.jwt = null;
    this.router.navigate(['/home']);
  }

  isLogged(){
    return this.jwt && this.jwt.exp > moment().unix();
  }

  updateUser(user: User, profile: ProfileComponent){
    console.log(user);
    this.http.put<any>( hostname + '/modify_user', user).subscribe(
      res => {
        this.user = user;
        profile.showResult(true, 'Data successfully updated');
      },
      err => {
        if (err.status >= 400 && err.status < 500) {
          profile.showResult(false, err.message);
        }
        profile.showResult(false, 'Some error occurred during request');

      }
    );
  }
}
