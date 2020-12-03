import {Component, Input, OnInit} from '@angular/core';
import {Assignment} from '../assignment.model';
import {MatDialog} from '@angular/material/dialog';
import {NewAssignmentDialogComponent} from './new-assignment-dialog.component';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {

  @Input() assignments: Assignment[];
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  addAssignment() {
    this.dialog.open(NewAssignmentDialogComponent);
  }
}
