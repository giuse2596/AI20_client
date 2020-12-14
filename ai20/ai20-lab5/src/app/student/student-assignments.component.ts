import {Component, Input, OnInit} from '@angular/core';
import {Assignment} from '../models/assignment.model';
import {Student} from '../models/student.model';

@Component({
  selector: 'app-student-assignments',
  templateUrl: './student-assignments.component.html',
  styleUrls: ['./student-assignments.component.css']
})
export class StudentAssignmentsComponent implements OnInit {

  assignments: Assignment[] = [];
  @Input()
  set assignmentsArray(assignments: Assignment[]) {
    if (assignments !== null) {
      for (const assignment of assignments) {
        // todo get image . subscribe (
        assignment.releaseDate = new Date(assignment.releaseDate);
        assignment.expiryDate = new Date(assignment.expiryDate);
        this.assignments.push(assignment);
        this.assignments.sort((ass1, ass2) =>
          ass2.releaseDate.getTime() - ass1.releaseDate.getTime()); // ordina dalla più recente alla più vecchia
        // todo )
      }
    }
  }
  @Input() student: Student;
  @Input() courseName: string;
  constructor() { }

  ngOnInit(): void {
  }

  seeImage() {
    // todo
  }
}
