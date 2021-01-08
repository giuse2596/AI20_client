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
import { StudentsComponent } from './teacher/students.component';
import { StudentsContComponent } from './teacher/students-cont.component';
import { AppRoutingModule } from './app-routing-module';
import { HomeComponent } from './home.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { VmsContComponent} from './teacher/vms-cont.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginDialogComponent } from './auth/login-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AddCourseComponent } from './teacher/add-course.component';
import { GroupsComponent } from './student/groups.component';
import { GroupsContComponent } from './student/groups-cont.component';
import { GroupNameDialogComponent } from './student/group-name-dialog.component';
import {SignupComponent} from './auth/signup.component';
import {MatMenuModule} from '@angular/material/menu';
import { TeacherAssignmentsContComponent } from './teacher/teacher-assignments-cont.component';
import { TeacherAssignmentsComponent } from './teacher/teacher-assignments.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { TeacherDeliveryComponent } from './teacher/teacher-delivery.component';
import { CorrectDialogComponent } from './teacher/correct-dialog.component';
import {NewAssignmentDialogComponent} from './teacher/new-assignment-dialog.component';
import {ProfileComponent} from './auth/profile.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {TeacherDeliveryHistoricalsComponent} from './teacher/teacher-delivery-historicals.component';
import {MatSelectModule} from '@angular/material/select';
import {StudentAssignmentsContComponent} from './student/student-assignments-cont.component';
import {StudentAssignmentsComponent} from './student/student-assignments.component';
import {StudentDeliveryComponent} from './student/student-delivery.component';
import {StudentDeliveryHistoricalsComponent} from './student/student-delivery-historicals.component';
import {EvaluateDialogComponent} from './teacher/evaluate-dialog.component';
import {SubmitDeliveryDialogComponent} from './student/submit-delivery-dialog.component';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {TeacherImageDialogComponent} from './teacher/teacher-image-dialog.component';
import {StudentImageDialogComponent} from './student/student-image-dialog.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {DatePipe} from '@angular/common';
import {CourseDetailsContComponent} from "./teacher/course-details-cont.component";
import {CourseDetailsComponent} from "./teacher/course-details.component";
import {ConfirmDisclaimerComponent} from "./teacher/confirm-disclaimer.component";
import {HomeCourseComponent} from './home-course.component';
import {VmsComponent} from "./teacher/vms.component";
import {StudentVmsComponent} from "./student/student-vms.component";
import {StudentVmsContComponent} from "./student/student-vms-cont.component";
import {CreateVmDialogComponent} from "./student/create-vm-dialog.component";
import {EditVmDialogComponent} from "./student/edit-vm-dialog.component";


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
    EditVmDialogComponent
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
    EditVmDialogComponent
  ],
  providers: [DatePipe,
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
