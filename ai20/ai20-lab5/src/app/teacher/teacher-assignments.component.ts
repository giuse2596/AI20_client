import {Component, Input, OnInit} from '@angular/core';
import {Assignment} from '../models/assignment.model';
import {MatDialog} from '@angular/material/dialog';
import {NewAssignmentDialogComponent} from './new-assignment-dialog.component';
import {Student} from '../models/student.model';
import {TeacherImageDialogComponent} from './teacher-image-dialog.component';

@Component({
  selector: 'app-teacher-assignments',
  templateUrl: './teacher-assignments.component.html',
  styleUrls: ['./teacher-assignments.component.css']
})
export class TeacherAssignmentsComponent implements OnInit {

  assignments: Assignment[] = [];
  @Input()
  set assignmentsArray(assignments: Assignment[]) {
    if (assignments !== null) {
      for (const assignment of assignments) {
        assignment.releaseDate = new Date(assignment.releaseDate);
        assignment.expiryDate = new Date(assignment.expiryDate);
        this.assignments.push(assignment);
        this.assignments.sort((ass1, ass2) =>
          ass2.releaseDate.getTime() - ass1.releaseDate.getTime()); // ordina dalla più recente alla più vecchia
      }
    }
  }
  @Input() students: Student[];
  @Input() courseName: string;
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  addAssignment(errorMessage ?: string) {
    const dialogRef = this.dialog.open(NewAssignmentDialogComponent, {data: {
        courseName: this.courseName,
        error: errorMessage
      }
    });
    dialogRef.afterClosed().subscribe(err => {
      if (err) {
        this.addAssignment(err);
      }
    });
  }

  seeImage(assignmentToOpen: Assignment) {
    this.dialog.open(TeacherImageDialogComponent, {data: {
        courseName: this.courseName,
        assignment: assignmentToOpen
      }
    });
  }
}
