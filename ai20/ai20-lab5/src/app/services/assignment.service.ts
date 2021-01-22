import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Assignment} from '../models/assignment.model';
import {HttpClient} from '@angular/common/http';
import {MatDialogRef} from '@angular/material/dialog';
import {NewAssignmentDialogComponent} from '../teacher/assignments/new-assignment-dialog.component';
import {DatePipe} from '@angular/common';

const hostnameCourses = '/server/API/courses';
const hostnameStudents = '/server/API/students';

@Injectable({
  providedIn: 'root'
})

export class AssignmentService {

  constructor(private http: HttpClient, private datePipe: DatePipe) { }

  getAssignmentsForCourse(courseName: string): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(`${hostnameCourses}/${courseName}/assignments`);
  }

  createAssignment(courseName: string, assignment: Assignment, file: any, dialogRef: MatDialogRef<NewAssignmentDialogComponent>) {
    const formData = new FormData();
    formData.append('name', assignment.name);
    formData.append('expiryDate', this.datePipe.transform(assignment.expiryDate, 'yyyy-MM-dd'));
    formData.append('multipartFile', file);
    return this.http.post<Assignment>(`${hostnameCourses}/${courseName}/assignments`, formData)
      .subscribe(assignmentCreated => {
          assignmentCreated.expiryDate = new Date(assignmentCreated.expiryDate);
          dialogRef.close({data: assignmentCreated});
        },
        err => {
          dialogRef.close({err: err.error.message});
        });
  }

  getAssignmentImageForTeacher(courseName: string, assignmentId: string) {
    return this.http.get(`${hostnameCourses}/${courseName}/assignments/${assignmentId}/image`,
      {responseType: 'blob'});
  }

  getAssignmentImageForStudent(studentId: string, assignmentId: string) {
    return this.http.get(`${hostnameStudents}/${studentId}/assignments/${assignmentId}`,
      {responseType: 'blob'});
  }
}
