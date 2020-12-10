import {Component, Input, OnInit} from '@angular/core';
import {Homework} from '../homework.model';
import {CorrectDialogComponent} from './correct-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {Assignment} from '../assignment.model';
import {Delivery} from '../delivery.model';
import {DeliveryService} from '../services/delivery.service';
import {EvaluateDialogComponent} from './evaluate-dialog.component';

@Component({
  selector: 'app-teacher-delivery-historicals',
  templateUrl: './teacher-delivery-historicals.component.html',
  styleUrls: ['./teacher-delivery-historicals.component.css']
})
export class TeacherDeliveryHistoricalsComponent implements OnInit {
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
              this.deliveryService.getDeliveryImage(this.lastDelivery.studentId, this.courseName,
                this.assignment, this.homework.id, this.lastDelivery.id)
                .subscribe(image => {
                  deliveryHistorical.content = null; // image
                  this.deliveryHistoricals.push(deliveryHistorical);
                  this.deliveryHistoricals.sort((del1, del2) =>
                    del1.timestamp.getTime() - del2.timestamp.getTime()); // ordina dalla più vecchia alla più recente
                });
            }
          });
      });
  }

  correct() {
    this.dialog.open(CorrectDialogComponent, {data: {
        delivery: this.lastDelivery,
        assignment: this.assignment,
        homework: this.homework,
        courseName: this.courseName
      }
    });
  }

  evaluate() {
    this.dialog.open(EvaluateDialogComponent, {data: {
        assignment: this.assignment,
        homework: this.homework,
        courseName: this.courseName
      }
    });
  }
}
