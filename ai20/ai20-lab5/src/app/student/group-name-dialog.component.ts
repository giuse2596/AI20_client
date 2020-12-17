import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogData} from './dialogData.module';
import {StudentService} from '../services/student.service';
import {Request} from '../models/request.model';

@Component({
  selector: 'app-group-name-dialog',
  templateUrl: './group-name-dialog.component.html',
  styleUrls: ['./group-name-dialog.component.css']
})
export class GroupNameDialogComponent implements OnInit {

  groupForm: FormGroup =  this.builder.group({
    name: ['', [Validators.required]],
    expiry: ['', [Validators.required, Validators.min(5)]]
  });

  constructor(private builder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private studentService: StudentService
  ) { }

  ngOnInit(): void {
  }

  get expiry(){
    return this.groupForm.get('expiry');
  }

  get name(){
    return this.groupForm.get('name');
  }

  sendRequest() {
    const timeoutMillis = this.expiry.value * 60 * 1000;
    const request = new Request(this.data.proposer, this.name.value, this.data.members, this.data.courseName, timeoutMillis);
    this.studentService.proposeTeam(request);
  }
}
