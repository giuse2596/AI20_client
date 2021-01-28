import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from './auth/login-dialog.component';
import { AuthService } from './auth/auth.service';
import {ActivatedRoute, ParamMap, Route, Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {CourseService} from './services/course.service';
import {Course} from './models/course.model';
import {SignupComponent} from './auth/signup.component';
import {User} from './models/user.model';
import {StudentService} from './services/student.service';
import {AddCourseComponent} from './teacher/addCourse/add-course.component';
import {ScrollStrategyOptions} from "@angular/cdk/overlay";

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
  courses$: Observable<Course[]>;
  logged = false;
  selected: Course;
  top = '0 20px 20px 20px';

  constructor(public dialog: MatDialog,
              private authService: AuthService,
              private actRoute: ActivatedRoute,
              private routes: Router,
              private courseService: CourseService,
              private studentService: StudentService){
  }

  ngOnInit(){
    this.subscription = this.actRoute.queryParamMap.subscribe(
      (params: ParamMap ) => {
        const doLogin = params.get('doLogin');
        if (doLogin === 'true'){
          this.openDialog(false);
        }
        const doSignup = params.get('doSignup');
        if (doSignup === 'true'){
          this.openDialogSignup(false, false);
        }

        const doDelete = params.get('doDelete');
        if(doDelete === 'true'){
          this.selected = null;
          this.courses$ = this.courseService.getAll();
          this.routes.navigate(['/home']);
        }
      }
    );



  }

  openDialogSignup(signupFailed, signed){
      const dialogRef = this.dialog.open(SignupComponent, {data: {
          failedSignup: signupFailed,
          signed
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        this.routes.navigate(['/home']);
        if (result === true){
          this.top = '0 20px 20px 20px';
          this.openDialogSignup(false, true);
        }else if (result === false){
          this.top = '0 20px 20px 20px';
          this.label = 'Login';
          this.openDialogSignup(true, false);
        }

      });

  }

  openDialog(loginFailed){
    if ( this.authService.isLogged()){
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
        this.routes.navigate(['/home']);
        if (result === true){
          this.label = 'Logout';
          this.logged = true;
          this.user = this.authService.user;
          this.user.username = this.user.email.split('@')[0];
          this.top = '20px 20px 20px 20px';
          if (this.user.token.roles[0] === 'ROLE_TEACHER') {
            this.courses$ = this.courseService.getAll();
          }
          if (this.user.token.roles[0] === 'ROLE_STUDENT') {
            this.courses$ = this.studentService.getCourses(this.user.username);
          }

        }else if (result === false){
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

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  selectCourse(course: Course){
    this.selected = course;
  }

  openDialogAdd(failed: boolean = false, message: string = ''){
    const dialog = this.dialog.open(AddCourseComponent, {
      data: {
        failed: failed,
        errorMessage: message
      }
    }).afterClosed().subscribe(
      res => {
        if (res && res.result === false){
          this.openDialogAdd(true, res.message);
        }else if(res && res.result === true){
          this.courses$ = this.courseService.getAll();
        }
      }
    );


  }

}


