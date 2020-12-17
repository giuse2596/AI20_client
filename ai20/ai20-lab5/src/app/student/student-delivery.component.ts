import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Assignment} from '../models/assignment.model';
import {DeliveryService} from '../services/delivery.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {Delivery} from '../models/delivery.model';
import {Student} from '../models/student.model';

@Component({
  selector: 'app-student-delivery',
  templateUrl: './student-delivery.component.html',
  styleUrls: ['./student-delivery.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class StudentDeliveryComponent implements OnInit {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayColumns: string[] =
    ['studentId', 'studentFirstName', 'studentName', 'timestamp', 'status'];
  selectedState = '';
  dataSourceDeliveries: MatTableDataSource<Delivery> = new MatTableDataSource();
  deliveries: Delivery[] = [];
  @Input() courseName: string;
  @Input() assignment: Assignment;
  expandedDelivery: Delivery;
  students: Student[];
  @Input()
  set studentInput(student: Student) {
    if (student !== null) {
      this.deliveryService.getLastDeliveriesForStudent(this.courseName, this.assignment, student)
        .subscribe(delivery => {
          delivery.timestamp = new Date(delivery.timestamp);
          delivery.studentId = student.id;
          delivery.studentName = student.name;
          delivery.studentFirstName = student.firstName;
          this.deliveries.push(delivery);
          this.dataSourceDeliveries = new MatTableDataSource(this.deliveries);
          this.dataSourceDeliveries.sort = this.sort;
        });
    }
  }

  constructor(private deliveryService: DeliveryService) { }

  ngOnInit(): void {
  }

  filter() {
    this.dataSourceDeliveries = new MatTableDataSource(this.deliveries.filter(delivery => {
      if (this.selectedState !== '') {
        return delivery.status === this.selectedState;
      }
      else {
        return true;
      }
    }));
    this.dataSourceDeliveries.sort = this.sort;
  }
}
