import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogData} from './dialogData.module';
import {DeliveryService} from '../services/delivery.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-correct-dialog',
  templateUrl: './correct-dialog.component.html',
  styleUrls: ['./correct-dialog.component.css']
})
export class CorrectDialogComponent implements OnInit {
  nowDate: Date;
  expiryDate: Date;
  deliveryToRedo = false;
  image: any;
  file: any;

  correctionForm: FormGroup = this.builder.group({
    inputFile: ['', Validators.required],
  });

  constructor(private builder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private deliveryService: DeliveryService,
              public dialogRef: MatDialogRef<CorrectDialogComponent>) { }

  ngOnInit(): void {
    this.nowDate = new Date();
    this.expiryDate = new Date(this.data.assignment.expiryDate);
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

  confirmCorrection() {
    const homeworkToUpdate = this.data.homework.editable !== this.deliveryToRedo;
    this.deliveryService.reviewDelivery(this.data.courseName, this.data.assignment.id,
      this.data.homework, this.file, this.dialogRef, homeworkToUpdate);
  }
}
