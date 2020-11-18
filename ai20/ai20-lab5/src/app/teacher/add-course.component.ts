import {Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  courseForm: FormGroup =  this.builder.group({
    name: ['', Validators.required],
  });


  constructor(public dialogRef: MatDialogRef<AddCourseComponent>
    , private builder: FormBuilder) {}

  ngOnInit(): void {
  }

  onNoClick(): void{
    this.dialogRef.close();
  }

  get name(){
    return this.courseForm.get('name');
  }

}
