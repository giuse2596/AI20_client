import { Component, ViewChild, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from './auth/login-dialog.component';
import { AuthService } from './auth/auth.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {AddCourseComponent} from "./teacher/add-course.component";
import {CourseService} from "./services/course.service";
import {Course} from "./course.model";
import {SignupComponent} from "./auth/signup.component";
import {User} from "./user.model";
import {split} from "ts-node";

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
  user: User;
  label = 'Login';
  courses$ : Observable<Course[]>;
  logged: boolean = false;
  selected: Course;
  top = '0 20px 20px 20px';

  constructor(public dialog: MatDialog,
              private authService: AuthService,
              private route: ActivatedRoute,
              private routes: Router,
              private courseService: CourseService){
  }

  ngOnInit(){
    this.subscription = this.route.queryParamMap.subscribe(
      (params: ParamMap ) => {
        console.log(params);
        const doLogin = params.get('doLogin');
        if(doLogin === 'true'){
          this.openDialog(false);
        }
        const doSignup = params.get('doSignup');
        if(doSignup === 'true'){
          this.openDialogSignup(false);
        }
      }
    );

  }

  openDialogSignup(signupFailed){
      const dialogRef = this.dialog.open(SignupComponent, {data: {
          failedSignup: signupFailed
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
        this.routes.navigate(['/home']);
        if(result === true){
          this.label = 'Logout';
          this.logged = true;
          this.top = '20px 20px 20px 20px';
          this.courses$ = this.courseService.getAll();

        }else if(result === false){
          this.top = '0 20px 20px 20px';
          this.logged = false;
          this.label = 'Login';
          this.openDialogSignup(true);
        }

      });

  }

  openDialogAdd(){
    const dialog = this.dialog.open(AddCourseComponent);
  }

  openDialog(loginFailed){
    if( this.authService.isLogged()){
      this.top = '0 20px 20px 20px';
      this.authService.logout();
      this.label = 'Login';
      this.logged = false;
      this.user = null;
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
          this.logged = true;
          this.user = this.authService.user;
          this.user.id = this.user.email.split('@')[0];
          this.top = '20px 20px 20px 20px';
          console.log("app.component::ngOnInit is logged == true");
          this.courses$ = this.courseService.getAll();

        }else if(result === false){
          this.top = '0 20px 20px 20px';
          this.logged = false;
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

  selectCourse(course: Course){
    this.selected = course;
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }


}


