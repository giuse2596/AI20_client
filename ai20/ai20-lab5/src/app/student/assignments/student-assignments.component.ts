import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {StudentImageDialogComponent} from './student-image-dialog.component';
import {Assignment} from '../../models/assignment.model';
import {Student} from '../../models/student.model';
import {Course} from '../../models/course.model';

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
      if (assignments.length === 0) {
        this.noAssignmentsPresent = true;
      }
      for (const assignment of assignments) {
        assignment.releaseDate = new Date(assignment.releaseDate);
        assignment.expiryDate = new Date(assignment.expiryDate);
        this.assignments.push(assignment);
        this.assignments.sort((ass1, ass2) =>
          ass2.releaseDate.getTime() - ass1.releaseDate.getTime()); // ordina dalla più recente alla più vecchia
      }
    }
  }
  @Input() student: Student;
  @Input() course: Course;
  noAssignmentsPresent = false;
  readDelivery = false;
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  seeImage(assignmentToOpen: Assignment) {
    const dialogRef = this.dialog.open(StudentImageDialogComponent, {data: {
        studentId: this.student.id,
        courseName: this.course.name,
        assignment: assignmentToOpen
      }
    });
    dialogRef.afterClosed().subscribe(() => this.readDelivery = true);
  }
}
