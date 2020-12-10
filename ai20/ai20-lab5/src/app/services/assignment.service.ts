import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Assignment} from '../assignment.model';
import {HttpClient} from '@angular/common/http';

const hostnameCourses = 'http://localhost:3000/API/courses';
const hostnameStudents = 'http://localhost:3000/API/students';

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
