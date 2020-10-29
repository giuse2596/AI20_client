import { Component, ViewChild, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from './auth/login-dialog.component';
import { AuthService } from './auth/auth.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import { Subscription } from 'rxjs';
import {AddCourseComponent} from "./teacher/add-course.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{

  @ViewChild(MatSidenav)
  sidenavComponent: MatSidenav;

  private username: string;
  private password: string;
  private subscription: Subscription;
  label = 'Login';

  constructor(public dialog: MatDialog, private authService: AuthService, private route: ActivatedRoute, private routes: Router){
  }

  ngOnInit(){
    this.subscription = this.route.queryParamMap.subscribe(
      (params: ParamMap ) => {
        console.log(params);
        const doLogin = params.get('doLogin');
        if(doLogin === 'true'){
          this.openDialog(false);
        }
      }
    );
  }

  openDialogAdd(){
    const dialog = this.dialog.open(AddCourseComponent);
  }

  openDialog(loginFailed){
    if( this.authService.isLogged()){
      this.authService.logout();
      this.label = 'Login';
    }else{
      const dialogRef = this.dialog.open(LoginDialogComponent, {data: {
        failedLogin: loginFailed
      }
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
        this.routes.navigate(['/home']);
        if(result === true){
          this.label = 'Logout';
        }else if(result === false){
          this.label = 'Login';
          this.openDialog(true);
        }
      });
    }
  }

  toggleForMenuClick(){
    if (this.sidenavComponent.opened === true){
      this.sidenavComponent.close();
    }else{
      this.sidenavComponent.open();
    }
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}


