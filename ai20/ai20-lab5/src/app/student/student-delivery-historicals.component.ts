import {Component, Input, OnInit} from '@angular/core';
import {Homework} from '../homework.model';
import {MatDialog} from '@angular/material/dialog';
import {Assignment} from '../models/assignment.model';
import {Delivery} from '../models/delivery.model';
import {DeliveryService} from '../services/delivery.service';
import {SubmitDeliveryDialogComponent} from './submit-delivery-dialog.component';
import {StudentImageDialogComponent} from './student-image-dialog.component';

@Component({
  selector: 'app-student-delivery-historicals',
  templateUrl: './student-delivery-historicals.component.html',
  styleUrls: ['./student-delivery-historicals.component.css']
})
export class StudentDeliveryHistoricalsComponent implements OnInit {
  @Input() lastDelivery: Delivery;
  @Input() assignment: Assignment;
  @Input() courseName: string;
  homework: Homework;
  deliveryHistoricals: Delivery[] = [];

  constructor(public dialog: MatDialog,
              private deliveryService: DeliveryService) { }

  ngOnInit(): void {
    this.deliveryService.getHomework(this.courseName, this.assignment, this.lastDelivery.studentId)
      .subscribe(homework => {
        this.homework = homework;
        this.deliveryService.getHistoricalsForDelivery(this.courseName, this.assignment, this.lastDelivery.studentId)
          .subscribe(deliveryHistoricals => {
            for (const deliveryHistorical of deliveryHistoricals) {
              deliveryHistorical.timestamp = new Date(deliveryHistorical.timestamp);
              deliveryHistorical.content = null; // image
              this.deliveryHistoricals.push(deliveryHistorical);
              this.deliveryHistoricals.sort((del1, del2) =>
                del1.timestamp.getTime() - del2.timestamp.getTime()); // ordina dalla più vecchia alla più recente
            }
          });
      });
  }

  submitDelivery() {
    this.dialog.open(SubmitDeliveryDialogComponent, {data: {
        delivery: this.lastDelivery,
        assignment: this.assignment,
        homework: this.homework,
        courseName: this.courseName
      }
    });
  }

  seeImage(deliveryToOpen: Delivery) {
    this.dialog.open(StudentImageDialogComponent, {data: {
        courseName: this.courseName,
        assignment: this.assignment,
        homework: this.homework,
        delivery: deliveryToOpen
      }
    });
  }
}
