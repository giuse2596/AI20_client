import {Component, Input, OnInit} from '@angular/core';
import {Homework} from '../models/homework.model';
import {CorrectDialogComponent} from './correct-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {Assignment} from '../models/assignment.model';
import {Delivery} from '../models/delivery.model';
import {DeliveryService} from '../services/delivery.service';
import {EvaluateDialogComponent} from './evaluate-dialog.component';
import {TeacherImageDialogComponent} from './teacher-image-dialog.component';
import {Course} from '../models/course.model';

@Component({
  selector: 'app-teacher-delivery-historicals',
  templateUrl: './teacher-delivery-historicals.component.html',
  styleUrls: ['./teacher-delivery-historicals.component.css']
})
export class TeacherDeliveryHistoricalsComponent implements OnInit {
  @Input() lastDelivery: Delivery;
  @Input() assignment: Assignment;
  @Input() course: Course;
  homework: Homework;
  deliveryHistoricals: Delivery[] = [];
  action: string;
  nowDate: Date;
  expiryDate: Date;

  constructor(public dialog: MatDialog,
              private deliveryService: DeliveryService) { }

  ngOnInit(): void {
    this.nowDate = new Date();
    this.expiryDate = new Date(this.assignment.expiryDate);
    this.deliveryService.getHomework(this.course.name, this.assignment, this.lastDelivery.studentId)
      .subscribe(homework => {
        this.homework = homework;
        this.action = this.homework.editable ? 'Attiva' : 'Disattiva';
        this.deliveryService.getHistoricalsForDelivery(this.course.name, this.assignment, this.lastDelivery.studentId)
          .subscribe(deliveryHistoricals => {
            for (const deliveryHistorical of deliveryHistoricals) {
              deliveryHistorical.studentId = this.lastDelivery.studentId;
              deliveryHistorical.studentName = this.lastDelivery.studentName;
              deliveryHistorical.studentFirstName = this.lastDelivery.studentFirstName;
              deliveryHistorical.timestamp = new Date(deliveryHistorical.timestamp);
              this.deliveryHistoricals.push(deliveryHistorical);
              this.deliveryHistoricals.sort((del1, del2) =>
                del1.timestamp.getTime() - del2.timestamp.getTime()); // ordina dalla più vecchia alla più recente
            }
          });
      });
  }

  correct(errorMessage ?: string) {
    const dialogRef = this.dialog.open(CorrectDialogComponent, {data: {
        delivery: this.lastDelivery,
        assignment: this.assignment,
        homework: this.homework,
        courseName: this.course.name,
        error: errorMessage
      }
    });
    dialogRef.afterClosed().subscribe(err => {
      if (err) {
        this.correct(err);
      }
    });
  }

  evaluate() {
    this.dialog.open(EvaluateDialogComponent, {data: {
        assignment: this.assignment,
        homework: this.homework,
        courseName: this.course.name
      }
    });
  }

  seeImage(deliveryToOpen: Delivery) {
    this.dialog.open(TeacherImageDialogComponent, {data: {
        courseName: this.course.name,
        assignment: this.assignment,
        homework: this.homework,
        delivery: deliveryToOpen
      }
    });
  }

  setEditable() {
    this.homework.editable = !this.homework.editable;
    this.deliveryService.updateHomework(this.course.name, this.assignment.id, this.homework)
      .subscribe(() => this.action = this.action === 'Disattiva' ? 'Attiva' : 'Disattiva', // change button label
        () => this.homework.editable = !this.homework.editable); // restore old editable flag
  }
}
