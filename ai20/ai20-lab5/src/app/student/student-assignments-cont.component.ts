import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Assignment} from '../assignment.model';
import {AssignmentService} from '../services/assignment.service';
import {ActivatedRoute} from '@angular/router';
import {Student} from '../student.model';
import {StudentService} from '../services/student.service';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-student-assignments-cont',
  templateUrl: './student-assignments-cont.component.html',
  styleUrls: ['./student-assignments-cont.component.css']
})
export class StudentAssignmentsContComponent implements OnInit {
  assignments$: Observable<Assignment[]>;
  student$: Observable<Student>;
  courseId: string;

  constructor(private assignmentService: AssignmentService,
              private route: ActivatedRoute,
              private studentService: StudentService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.courseId = this.route.snapshot.params.courseId;
    const studentId = this.authService.user.username;
    this.assignments$ = this.assignmentService.getAssignmentsForCourse(this.courseId);
    this.student$ = this.studentService.find(studentId);
  }

}
