import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogData} from './dialogData.module';
import {DeliveryService} from '../services/delivery.service';
import {Delivery} from '../models/delivery.model';

@Component({
  selector: 'app-correct-dialog',
  templateUrl: './correct-dialog.component.html',
  styleUrls: ['./correct-dialog.component.css']
})
export class CorrectDialogComponent implements OnInit {
  nowDate: Date;
  expiryDate: Date;
  deliveryToRedo = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,
              private deliveryService: DeliveryService) { }

  ngOnInit(): void {
    this.nowDate = new Date();
    this.expiryDate = new Date(this.data.assignment.expiryDate);
  }

  confirmCorrection() {
    const newDelivery: Delivery = new Delivery('', this.data.delivery.content, new Date(), '');
    if (this.deliveryToRedo) {
      newDelivery.status = 'READ';
    } else {
      newDelivery.status = 'REVIEWED';
    }
    this.deliveryService.reviewDelivery(this.data.courseName, this.data.assignment.id, this.data.homework.id, newDelivery);
  }
}
