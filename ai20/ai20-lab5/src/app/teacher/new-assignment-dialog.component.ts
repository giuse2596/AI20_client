import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Assignment} from '../assignment.model';

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

  constructor( private builder: FormBuilder ) { }

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
    // todo
    const assignment = new Assignment('', '', '', new Date(), this.expiryDate.value);
  }

}
