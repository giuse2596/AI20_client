import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Assignment} from '../../models/assignment.model';
import {AssignmentService} from '../../services/assignment.service';
import {ActivatedRoute} from '@angular/router';
import {Student} from '../../models/student.model';
import {CourseService} from '../../services/course.service';
import {Course} from '../../models/course.model';

@Component({
  selector: 'app-teacher-assignments-cont',
  templateUrl: './teacher-assignments-cont.component.html',
  styleUrls: ['./teacher-assignments-cont.component.css']
})
export class TeacherAssignmentsContComponent implements OnInit {
  assignments$: Observable<Assignment[]>;
  students$: Observable<Student[]>;
  course$: Observable<Course>;

  constructor(private assignmentService: AssignmentService,
              private route: ActivatedRoute,
              private courseService: CourseService) { }

  ngOnInit(): void {
    const courseId = this.route.snapshot.params.courseId;
    this.assignments$ = this.assignmentService.getAssignmentsForCourse(courseId);
    this.students$ = this.courseService.getEnrolled(courseId);
    this.course$ = this.courseService.find(courseId);
  }

}
