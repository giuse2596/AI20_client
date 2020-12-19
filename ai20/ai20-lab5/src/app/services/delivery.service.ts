import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Assignment} from '../models/assignment.model';
import {Observable} from 'rxjs';
import {Homework} from '../models/homework.model';
import {Delivery} from '../models/delivery.model';
import {Student} from '../models/student.model';
import {MatDialogRef} from '@angular/material/dialog';
import {CorrectDialogComponent} from '../teacher/correct-dialog.component';
import {SubmitDeliveryDialogComponent} from '../student/submit-delivery-dialog.component';

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

  reviewDelivery(courseName: string, assignmentId: string, homework: Homework, file: any,
                 dialogRef: MatDialogRef<CorrectDialogComponent>, homeworkToUpdate: boolean) {
    const formData = new FormData();
    formData.append('file', file);
    this.http.post(`${hostnameCourses}/${courseName}/assignments/${assignmentId}/homeworks/${homework.id}`, formData)
      .subscribe(() => {
          if (homeworkToUpdate) {
            homework.editable = !homework.editable;
            this.updateHomework(courseName, assignmentId, homework);
          }
          dialogRef.close();
        },
        err => {
          dialogRef.close(err.error.message);
        });
  }

  getHistoricalsForDelivery(courseName: string, assignment: Assignment, studentId: string): Observable<Delivery[]> {
    return this.http.get<Delivery[]>(`${hostnameCourses}/${courseName}/assignments/${assignment.id}/${studentId}`);
  }

  getHomework(courseName: string, assignment: Assignment, studentId: string): Observable<Homework> {
    return this.http.get<Homework>(`${hostnameCourses}/${courseName}/assignments/${assignment.id}/homeworks/${studentId}`);
  }

  getDeliveryImage(studentId: string, courseName: string, assignment: Assignment,
                   homeworkId: string, deliveryId: string) {
    return this.http.get(`${hostnameStudents}/${studentId}/${courseName}/${assignment.id}/${homeworkId}/deliveries/${deliveryId}`,
      {responseType: 'blob'});
  }

  updateHomework(courseName: string, assignmentId: string, homework: Homework) {
    this.http.put<Homework>(`${hostnameCourses}/${courseName}/assignments/${assignmentId}/homeworks/${homework.id}`, homework).subscribe();
  }

  submitDelivery(studentId: string, courseName: string, assignmentId: string,
                 homeworkId: string, file: any, dialogRef: MatDialogRef<SubmitDeliveryDialogComponent>) {
    const formData = new FormData();
    formData.append('file', file);
    this.http.post(`${hostnameStudents}/${studentId}/${courseName}/${assignmentId}/${homeworkId}/deliveries`, formData)
      .subscribe(() => {
          dialogRef.close();
        },
        err => {
          dialogRef.close(err.error.message);
        });
  }
}
