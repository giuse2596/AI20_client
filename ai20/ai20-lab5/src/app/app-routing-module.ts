import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsContComponent} from './teacher/students-cont.component';
import { HomeComponent } from './home.component';
import { VmsContComponent } from './teacher/vms-cont.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { AuthGuard } from './auth/auth.guard';
import {GroupsContComponent} from './student/groups-cont.component';
import {ProfileComponent} from './auth/profile.component';
import {TeacherAssignmentsContComponent} from './teacher/teacher-assignments-cont.component';
import {StudentAssignmentsContComponent} from './student/student-assignments-cont.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'profile', component: ProfileComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'teacher/courses', canActivate: [AuthGuard],
      children: [
       { path: 'applicazioni-internet/students', component: StudentsContComponent },
       { path: ':courseId/assignments', component: TeacherAssignmentsContComponent },
       { path: 'applicazioni-internet/vms', component: VmsContComponent }
        ] },
    { path: 'student/:studentId', canActivate: [AuthGuard],
      children: [
        { path: 'courses/:courseId/groups', component: GroupsContComponent },
        { path: 'courses/:courseId/assignments', component: StudentAssignmentsContComponent },
      ]},
    { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { enableTracing: false })
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule {}
