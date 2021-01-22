import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogData} from '../dialogData.module';
import {StudentService} from '../../services/student.service';
import {Group} from '../../models/group.model';

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
  submission = false;

  constructor(private builder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private studentService: StudentService,
              public dialogRef: MatDialogRef<GroupNameDialogComponent>
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
    const timeout = this.expiry.value * 60 * 1000;  // in millisecondi
    const expiry = new Date();
    expiry.setMilliseconds(expiry.getMilliseconds() + timeout);
    this.submission = true;
    this.studentService.proposeTeam(this.data.courseName, this.name.value, this.data.proposer, timeout, this.data.members, this.dialogRef);
  }
}
