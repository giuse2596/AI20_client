import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Assignment} from '../../models/assignment.model';
import {DeliveryService} from '../../services/delivery.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {Student} from '../../models/student.model';
import {Delivery} from '../../models/delivery.model';
import {Course} from '../../models/course.model';

@Component({
  selector: 'app-teacher-delivery',
  templateUrl: './teacher-delivery.component.html',
  styleUrls: ['./teacher-delivery.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TeacherDeliveryComponent implements OnInit {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayColumns: string[] =
    ['studentId', 'studentFirstName', 'studentName', 'timestamp', 'status'];
  selectedState = '';
  dataSourceDeliveries: MatTableDataSource<Delivery> = new MatTableDataSource();
  deliveries: Delivery[] = [];
  @Input() course: Course;
  @Input() assignment: Assignment;
  expandedDelivery: Delivery;
  students: Student[];
  @Input()
  set studentsArray(students: Student[]) {
    if (students !== null) {
      this.students = [... students];
      for (const student of this.students) {
        this.deliveryService.getLastDeliveriesForStudent(this.course.name, this.assignment, student)
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
