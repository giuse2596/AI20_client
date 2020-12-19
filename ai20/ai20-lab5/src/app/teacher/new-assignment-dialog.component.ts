import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Assignment} from '../models/assignment.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogData} from './dialogData.module';
import {AssignmentService} from '../services/assignment.service';

@Component({
  selector: 'app-new-assignment-dialog',
  templateUrl: './new-assignment-dialog.component.html',
  styleUrls: ['./new-assignment-dialog.component.css']
})
export class NewAssignmentDialogComponent implements OnInit {

  image: any;
  file: any;

  assignmentForm: FormGroup = this.builder.group({
    name: ['', Validators.required],
    inputFile: ['', Validators.required],
    expiryDate: ['', Validators.required]
  });

  constructor( private builder: FormBuilder,
               @Inject(MAT_DIALOG_DATA) public data: DialogData,
               private assignmentService: AssignmentService,
               public dialogRef: MatDialogRef<NewAssignmentDialogComponent>) { }

  ngOnInit(): void {
  }

  get name(){
    return this.assignmentForm.get('name');
  }

  get expiryDate(){
    return this.assignmentForm.get('expiryDate');
  }

  onChangeImage(event){
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.image = reader.result;
    }, false);

    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0];
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  createAssignment() {
    const assignment = new Assignment('', this.name.value , '', new Date(), this.expiryDate.value);
    this.assignmentService.createAssignment(this.data.courseName, assignment, this.file, this.dialogRef);
  }

}
