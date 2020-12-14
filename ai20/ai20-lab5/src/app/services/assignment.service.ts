import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Assignment} from '../models/assignment.model';
import {HttpClient} from '@angular/common/http';

const hostnameCourses = '/server/API/courses';
const hostnameStudents = '/server/API/students';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  constructor(private http: HttpClient) { }

  getAssignmentsForCourse(courseName: string): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(`${hostnameCourses}/${courseName}/assignments`);
  }

  createAssignment(courseName: string, assignment: Assignment) {
    this.http.post<Assignment>(`${hostnameCourses}/${courseName}/assignments`, assignment).subscribe();
  }
}
