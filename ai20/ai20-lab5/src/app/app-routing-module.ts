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
import {HomeCourseComponent} from './home-course.component';
import {CourseDetailsContComponent} from "./teacher/course-details-cont.component";
import {StudentVmsContComponent} from "./student/student-vms-cont.component";

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'home/:courseId', component: HomeCourseComponent, canActivate: [AuthGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'teacher', canActivate: [AuthGuard],
      children: [
       { path: 'courses/:courseId/students', component: StudentsContComponent, canActivate: [AuthGuard] },
       { path: 'courses/:courseId/assignments', component: TeacherAssignmentsContComponent , canActivate: [AuthGuard]},
       { path: 'courses/:courseId/vms', component: VmsContComponent, canActivate: [AuthGuard] },
       { path: 'courses/:courseId/details', component: CourseDetailsContComponent, canActivate: [AuthGuard]},

        ]
    },
    { path: 'student', canActivate: [AuthGuard],
      children: [
        { path: 'courses/:courseId/groups', component: GroupsContComponent, canActivate: [AuthGuard] },
        { path: 'courses/:courseId/assignments', component: StudentAssignmentsContComponent, canActivate: [AuthGuard] },
        { path: 'courses/:courseId/vms', component: StudentVmsContComponent, canActivate: [AuthGuard]},
      ]
    },
    { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { enableTracing: false })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule{}
