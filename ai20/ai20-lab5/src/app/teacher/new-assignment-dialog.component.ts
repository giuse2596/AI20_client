import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Assignment} from '../assignment.model';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogData} from './dialogData.module';
import {AssignmentService} from '../services/assignment.service';

@Component({
  selector: 'app-new-assignment-dialog',
  templateUrl: './new-assignment-dialog.component.html',
  styleUrls: ['./new-assignment-dialog.component.css']
})
export class NewAssignmentDialogComponent implements OnInit {

  url = '';

  assignmentForm: FormGroup = this.builder.group({
    image: ['', Validators.required],
    expiryDate: ['', Validators.required]
  });

  constructor( private builder: FormBuilder,
               @Inject(MAT_DIALOG_DATA) public data: DialogData,
               private assignmentService: AssignmentService) { }

  ngOnInit(): void {
  }

  get image(){
    return this.assignmentForm.get('image');
  }

  get expiryDate(){
    return this.assignmentForm.get('expiryDate');
  }

  onChangeImage(event){
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (event: any) => {
        this.url = event.target.result;
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  createAssignment() {
    const assignment = new Assignment('', this.image.value, this.data.courseName, new Date(), this.expiryDate.value);
    this.assignmentService.createAssignment(this.data.courseName, assignment);
  }

}
