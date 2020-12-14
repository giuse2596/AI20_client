import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Student} from '../models/student.model';
import {StudentService} from '../services/student.service';
import {ActivatedRoute} from '@angular/router';
import {Course} from '../models/course.model';
import {CourseService} from '../services/course.service';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-groups-cont',
  templateUrl: './groups-cont.component.html',
  styleUrls: ['./groups-cont.component.css']
})
export class GroupsContComponent implements OnInit {
/*  requests$: Observable<Request[]>;
  members$: Observable<Student[]>;
  availables$: Observable<Student[]>;*/
  student$: Observable<Student>;
  course$: Observable<Course>;

  constructor(private studentService: StudentService,
              private route: ActivatedRoute,
              private courseService: CourseService,
              private authService: AuthService) { }

  ngOnInit(): void {
    const studentId = this.authService.user.username;
    const courseId = this.route.snapshot.params.courseId;
    this.student$ = this.studentService.find(studentId);
    this.course$ = this.courseService.find(courseId);
/*    this.members$ = this.studentService.getGroupMembers('id');
    this.availables$ = this.courseService.getAvailablesForCourse(courseId);
    this.requests$ = this.studentService.getPendingGroupsForCourse(courseId);*/
  }

}
