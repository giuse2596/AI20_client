import {Component, Input, OnInit} from '@angular/core';
import {Homework} from '../../models/homework.model';
import {MatDialog} from '@angular/material/dialog';
import {Assignment} from '../../models/assignment.model';
import {Delivery} from '../../models/delivery.model';
import {DeliveryService} from '../../services/delivery.service';
import {SubmitDeliveryDialogComponent} from './submit-delivery-dialog.component';
import {StudentImageDialogComponent} from './student-image-dialog.component';
import {Course} from '../../models/course.model';
import {MessageService} from '../../services/message.service';

@Component({
  selector: 'app-student-delivery-historicals',
  templateUrl: './student-delivery-historicals.component.html',
  styleUrls: ['./student-delivery-historicals.component.css']
})
export class StudentDeliveryHistoricalsComponent implements OnInit {
  @Input() lastDelivery: Delivery;
  @Input() assignment: Assignment;
  @Input() course: Course;
  homework: Homework;
  deliveryHistoricals: Delivery[] = [];
  nowDate: Date;
  expiryDate: Date;
  @Input()
  set readAssignmentInput(readAssignment: string) {
    if (readAssignment) {
      if (this.lastDelivery.status === 'NULL' && this.assignment.id === readAssignment) {
        this.lastDelivery.status = 'READ';
        this.lastDelivery.timestamp = new Date();
        const delivery = new Delivery(this.lastDelivery.id, this.lastDelivery.pathImage, new Date(), 'READ');
        // assegno id di lastDelivery per rintracciare l'immagine, quando la view sarà refreshata l'id verrà opportunamente modificato
        this.deliveryHistoricals.push(delivery);
      }
    }
  }

  constructor(public dialog: MatDialog,
              private deliveryService: DeliveryService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.nowDate = new Date();
    this.expiryDate = new Date(this.assignment.expiryDate);
    this.deliveryService.getHomework(this.course.name, this.assignment, this.lastDelivery.studentId)
      .subscribe(homework => {
        this.homework = homework;
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

  submitDelivery(errorMessage ?: string) {
    const dialogRef = this.dialog.open(SubmitDeliveryDialogComponent, {data: {
        delivery: this.lastDelivery,
        assignment: this.assignment,
        homework: this.homework,
        courseName: this.course.name,
        error: errorMessage
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.data) {
        this.deliveryHistoricals.push(result.data);
        this.lastDelivery.status = 'DELIVERED';
        this.lastDelivery.timestamp = new Date();
        this.messageService.printMessage(true, 'Elaborato caricato con successo');
      }
      if (result && result.err) {
        this.submitDelivery(result.err);
      }
    });
  }

  seeImage(deliveryToOpen: Delivery) {
    this.dialog.open(StudentImageDialogComponent, {data: {
        courseName: this.course.name,
        assignment: this.assignment,
        homework: this.homework,
        delivery: deliveryToOpen
      }
    });
  }
}
