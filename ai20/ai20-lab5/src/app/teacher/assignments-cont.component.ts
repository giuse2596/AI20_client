import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Assignment} from '../assignment.model';
import {AssignmentService} from '../services/assignment.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-assignments-cont',
  templateUrl: './assignments-cont.component.html',
  styleUrls: ['./assignments-cont.component.css']
})
export class AssignmentsContComponent implements OnInit {
  assignments$: Observable<Assignment[]>;

  constructor(private assignmentService: AssignmentService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const courseId = this.route.snapshot.params.courseId;
    this.assignments$ = this.assignmentService.getAssignmentsForCourse(courseId);
  }

}
