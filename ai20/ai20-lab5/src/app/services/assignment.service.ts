import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Assignment} from '../assignment.model';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  constructor() { }

  getAssignmentsForCourse(courseId: string): Observable<Assignment[]> {
    return undefined;
  }
}
