import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogData} from './dialogData.module';
import {DeliveryService} from '../services/delivery.service';

@Component({
  selector: 'app-evaluate-dialog',
  templateUrl: './evaluate-dialog.component.html',
  styleUrls: ['./evaluate-dialog.component.css']
})
export class EvaluateDialogComponent implements OnInit {

  evaluationForm: FormGroup =  this.builder.group({
    mark: ['', [Validators.required]]
  });

  constructor(private builder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private deliveryService: DeliveryService) { }

  ngOnInit(): void {
  }

  get mark(){
    return this.evaluationForm.get('mark');
  }

  confirmEvaluation() {
    this.data.homework.editable = false;
    this.data.homework.mark = this.mark.value;
    this.deliveryService.updateHomework(this.data.courseName, this.data.assignment.id, this.data.homework).subscribe();
  }
}
