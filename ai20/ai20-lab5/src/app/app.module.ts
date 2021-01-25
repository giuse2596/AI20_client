import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule} from '@angular/material/sort';
import { StudentsComponent } from './teacher/students/students.component';
import { StudentsContComponent } from './teacher/students/students-cont.component';
import { AppRoutingModule } from './app-routing-module';
import { HomeComponent } from './home.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { VmsContComponent} from './teacher/vms/vms-cont.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginDialogComponent } from './auth/login-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AddCourseComponent } from './teacher/addCourse/add-course.component';
import { GroupsComponent } from './student/teams/groups.component';
import { GroupsContComponent } from './student/teams/groups-cont.component';
import { GroupNameDialogComponent } from './student/teams/group-name-dialog.component';
import {SignupComponent} from './auth/signup.component';
import {MatMenuModule} from '@angular/material/menu';
import { TeacherAssignmentsContComponent } from './teacher/assignments/teacher-assignments-cont.component';
import { TeacherAssignmentsComponent } from './teacher/assignments/teacher-assignments.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { TeacherDeliveryComponent } from './teacher/assignments/teacher-delivery.component';
import { CorrectDialogComponent } from './teacher/assignments/correct-dialog.component';
import {NewAssignmentDialogComponent} from './teacher/assignments/new-assignment-dialog.component';
import {ProfileComponent} from './auth/profile.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {TeacherDeliveryHistoricalsComponent} from './teacher/assignments/teacher-delivery-historicals.component';
import {MatSelectModule} from '@angular/material/select';
import {StudentAssignmentsContComponent} from './student/assignments/student-assignments-cont.component';
import {StudentAssignmentsComponent} from './student/assignments/student-assignments.component';
import {StudentDeliveryComponent} from './student/assignments/student-delivery.component';
import {StudentDeliveryHistoricalsComponent} from './student/assignments/student-delivery-historicals.component';
import {EvaluateDialogComponent} from './teacher/assignments/evaluate-dialog.component';
import {SubmitDeliveryDialogComponent} from './student/assignments/submit-delivery-dialog.component';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {TeacherImageDialogComponent} from './teacher/assignments/teacher-image-dialog.component';
import {StudentImageDialogComponent} from './student/assignments/student-image-dialog.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {DatePipe} from '@angular/common';
import {CourseDetailsContComponent} from "./teacher/courseDetails/course-details-cont.component";
import {CourseDetailsComponent} from "./teacher/courseDetails/course-details.component";
import {ConfirmDisclaimerComponent} from "./teacher/courseDetails/confirm-disclaimer.component";
import {HomeCourseComponent} from './home-course.component';
import {VmsComponent} from "./teacher/vms/vms.component";
import {StudentVmsComponent} from "./student/vms/student-vms.component";
import {StudentVmsContComponent} from "./student/vms/student-vms-cont.component";
import {CreateVmDialogComponent} from "./student/vms/create-vm-dialog.component";
import {EditVmDialogComponent} from "./student/vms/edit-vm-dialog.component";
import {EditTeamResourcesDialogComponent} from "./teacher/vms/edit-team-resources-dialog.component";
import { MessageComponent } from './message.component';


@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    StudentsContComponent,
    HomeComponent,
    HomeCourseComponent,
    PageNotFoundComponent,
    VmsContComponent,
    VmsComponent,
    LoginDialogComponent,
    AddCourseComponent,
    LoginDialogComponent,
    GroupsComponent,
    GroupsContComponent,
    GroupNameDialogComponent,
    SignupComponent,
    TeacherAssignmentsContComponent,
    TeacherAssignmentsComponent,
    TeacherDeliveryComponent,
    CorrectDialogComponent,
    NewAssignmentDialogComponent,
    ProfileComponent,
    TeacherDeliveryHistoricalsComponent,
    StudentAssignmentsContComponent,
    StudentAssignmentsComponent,
    StudentDeliveryComponent,
    StudentDeliveryHistoricalsComponent,
    EvaluateDialogComponent,
    SubmitDeliveryDialogComponent,
    TeacherImageDialogComponent,
    StudentImageDialogComponent,
    CourseDetailsContComponent,
    CourseDetailsComponent,
    ConfirmDisclaimerComponent,
    StudentVmsComponent,
    StudentVmsContComponent,
    CreateVmDialogComponent,
    EditVmDialogComponent,
    EditTeamResourcesDialogComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatTabsModule,
    MatIconModule,
    MatTableModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatSortModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MatMenuModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatMenuModule,
    MatCardModule,
    MatGridListModule,
    MatSnackBarModule,
    MatSlideToggleModule
  ],
  entryComponents: [
    LoginDialogComponent,
    AddCourseComponent,
    SignupComponent,
    ConfirmDisclaimerComponent,
    CreateVmDialogComponent,
    EditVmDialogComponent,
    EditTeamResourcesDialogComponent
  ],
  providers: [DatePipe,
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent],
  exports: [MessageComponent]
})
export class AppModule { }
