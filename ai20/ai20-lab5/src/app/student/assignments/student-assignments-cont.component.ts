import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Assignment} from '../../models/assignment.model';
import {Student} from '../../models/student.model';
import {Course} from '../../models/course.model';
import {AssignmentService} from '../../services/assignment.service';
import {ActivatedRoute} from '@angular/router';
import {StudentService} from '../../services/student.service';
import {AuthService} from '../../auth/auth.service';
import {CourseService} from '../../services/course.service';

@Component({
  selector: 'app-student-assignments-cont',
  templateUrl: './student-assignments-cont.component.html',
  styleUrls: ['./student-assignments-cont.component.css']
})
export class StudentAssignmentsContComponent implements OnInit {
  assignments$: Observable<Assignment[]>;
  student$: Observable<Student>;
  course$: Observable<Course>;

  constructor(private assignmentService: AssignmentService,
              private route: ActivatedRoute,
              private studentService: StudentService,
              private authService: AuthService,
              private courseService: CourseService) { }

  ngOnInit(): void {
    const courseId = this.route.snapshot.params.courseId;
    const studentId = this.authService.user.username;
    this.assignments$ = this.assignmentService.getAssignmentsForCourse(courseId);
    this.student$ = this.studentService.find(studentId);
    this.course$ = this.courseService.find(courseId);
  }

}
