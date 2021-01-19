import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from './login-dialog.component';
import * as moment from 'moment';
import { Router } from '@angular/router';
import {SignupComponent} from './signup.component';
import {ProfileComponent} from './profile.component';
import {Observable} from "rxjs";



const hostname = '/server';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private jwt;
  user: User;
  logged = false;

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

  updatePassword(passMap, profile: ProfileComponent){
    this.http.put<any>( hostname + '/modify_user', passMap).subscribe(
      res => {
        profile.showResult(true, 'Password successfully updated');
      },
      err => {
        profile.showResult(false, 'Some error occurred during request');
      }
    );
  }

  getProfileImage(){
    return this.http.get(hostname + '/' + this.user.username + '/user_image', {
      responseType: 'blob'
    });
  }

  uploadImage(image: File, profile: ProfileComponent){
    const formData = new FormData();
    formData.append('multipartFile',image);
    this.http.put(hostname + '/' + this.user.username + '/modify_user_image', formData).subscribe(
      res => {
        profile.showResult(true, 'Immagine aggiornata con successo');
      },

      error => {
        profile.showResult(false, 'Ci sono stati problemi nell\' upload. Riprova');
      }
    );

  }
}
