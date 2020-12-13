import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Assignment} from '../assignment.model';
import {Observable} from 'rxjs';
import {Homework} from '../homework.model';
import {Delivery} from '../delivery.model';
import {Student} from '../student.model';

const hostnameCourses = '/server/API/courses';
const hostnameStudents = '/server/API/students';

@Injectable({
  providedIn: 'root'
})

export class DeliveryService {

  constructor(private http: HttpClient) { }

  getLastDeliveriesForStudent(courseName: string, assignment: Assignment, student: Student): Observable<Delivery> {
    return this.http.get<Delivery>(`${hostnameCourses}/${courseName}/assignments/${assignment.id}/${student.id}/last`);
  }

  reviewDelivery(courseName: string, assignmentId: string, homeworkId: string, delivery: Delivery) {
    this.http.post<Delivery>(`${hostnameCourses}/${courseName}/assignments/${assignmentId}/homeworks/${homeworkId}`, delivery).subscribe();
  }

  getHistoricalsForDelivery(courseName: string, assignment: Assignment, studentId: string): Observable<Delivery[]> {
    return this.http.get<Delivery[]>(`${hostnameCourses}/${courseName}/assignments/${assignment.id}/${studentId}`);
  }

  getHomework(courseName: string, assignment: Assignment, studentId: string): Observable<Homework> {
    return this.http.get<Homework>(`${hostnameCourses}/${courseName}/assignments/${assignment.id}/homeworks/${studentId}`);
  }

  getDeliveryImage(studentId: string, courseName: string, assignment: Assignment,
                   homeworkId: string, deliveryId: string): Observable<Delivery> {
    return this.http.get<Delivery>
    (`${hostnameStudents}/${studentId}/${courseName}/${assignment.id}/${homeworkId}/deliveries/${deliveryId}`);
  }

  evaluateHomework(courseName: string, assignmentId: string, homework: Homework) {
    this.http.put<Homework>(`${hostnameCourses}/${courseName}/assignments/${assignmentId}/homeworks/${homework.id}`, homework).subscribe();
  }

  submitDelivery(courseName: string, assignmentId: string, homeworkId: string, delivery: Delivery) {
    this.http.post<Delivery>
    (`${hostnameStudents}/${delivery.studentId}/${courseName}/${assignmentId}/${homeworkId}/deliveries`, delivery).subscribe();
  }
}
