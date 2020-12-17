import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Assignment} from '../models/assignment.model';
import {HttpClient} from '@angular/common/http';
import {MatDialogRef} from '@angular/material/dialog';
import {NewAssignmentDialogComponent} from '../teacher/new-assignment-dialog.component';

const hostnameCourses = '/server/API/courses';
const hostnameStudents = '/server/API/students';

class AssignmentWrapper {
  assignmentDTO: Assignment;
  file: any;
}

@Injectable({
  providedIn: 'root'
})

export class AssignmentService {

  constructor(private http: HttpClient) { }

  getAssignmentsForCourse(courseName: string): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(`${hostnameCourses}/${courseName}/assignments`);
  }

  createAssignment(courseName: string, assignment: Assignment, file: any, dialogRef: MatDialogRef<NewAssignmentDialogComponent>) {
/*    const assignmentWrapper: AssignmentWrapper = new AssignmentWrapper();
    assignmentWrapper.assignmentDTO = assignment;
    assignmentWrapper.file = file;
    console.log(assignmentWrapper);
    const formData = new FormData();
    formData.append('assignmentDTO', JSON.stringify(assignment));
    formData.append('file', file);
    console.log(formData.get('file'));
    console.log(formData.get('assignmentDTO'));*/
    return this.http.post(`${hostnameCourses}/${courseName}/assignments`, assignment)
      .subscribe(() => {
          dialogRef.close();
          // todo addImage()
        },
        err => {
          dialogRef.close(err.error.message);
        });
  }

  getAssignmentImageForTeacher(courseName: string, assignmentId: string) {
    return this.http.get(`${hostnameCourses}/${courseName}/assignments/${assignmentId}/image`,
      {responseType: 'blob'});
  }

  getAssignmentImageForStudent(studentId: string, courseName: string, assignmentId: string) {
    return this.http.get(`${hostnameStudents}/${studentId}/${courseName}/${assignmentId}`,
      {responseType: 'blob'});
  }

  addImage(file: any) {
    const formData = new FormData();
    formData.append('file', file);
    this.http.post(`${hostnameCourses}/assignments`, formData).subscribe();
  }
}
