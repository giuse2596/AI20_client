import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogData} from './dialogData.module';
import {DeliveryService} from '../services/delivery.service';
import {Delivery} from '../delivery.model';

@Component({
  selector: 'app-submit-delivery-assignment-dialog',
  templateUrl: './submit-delivery-dialog.component.html',
  styleUrls: ['./submit-delivery-dialog.component.css']
})
export class SubmitDeliveryDialogComponent implements OnInit {

  url = '';

  deliveryForm: FormGroup = this.builder.group({
    image: ['', Validators.required]
  });

  constructor( private builder: FormBuilder,
               @Inject(MAT_DIALOG_DATA) public data: DialogData,
               private deliveryService: DeliveryService) { }

  ngOnInit(): void {
  }

  get image(){
    return this.deliveryForm.get('image');
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
    const delivery = new Delivery('', this.image.value, new Date(), 'CONSEGNATO');
    delivery.studentId = this.data.delivery.studentId;
    delivery.studentName = this.data.delivery.studentName;
    delivery.studentFirstName = this.data.delivery.studentFirstName;
    this.deliveryService.submitDelivery(this.data.courseName, this.data.assignment.id, this.data.homework.id, delivery);
  }

}
