import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogData} from './dialogData.module';
import {DeliveryService} from '../services/delivery.service';

@Component({
  selector: 'app-submit-delivery-assignment-dialog',
  templateUrl: './submit-delivery-dialog.component.html',
  styleUrls: ['./submit-delivery-dialog.component.css']
})
export class SubmitDeliveryDialogComponent implements OnInit {

  image: any;
  file: any;

  deliveryForm: FormGroup = this.builder.group({
    inputFile: ['', Validators.required]
  });

  constructor( private builder: FormBuilder,
               @Inject(MAT_DIALOG_DATA) public data: DialogData,
               private deliveryService: DeliveryService,
               public dialogRef: MatDialogRef<SubmitDeliveryDialogComponent>) { }

  ngOnInit(): void {
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

  submitDelivery() {
    this.deliveryService.submitDelivery
    (this.data.delivery.studentId, this.data.courseName, this.data.assignment.id, this.data.homework.id, this.file, this.dialogRef);
  }

}
