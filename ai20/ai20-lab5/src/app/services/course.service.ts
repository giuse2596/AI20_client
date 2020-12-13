import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Student} from '../student.model';
import {Course} from '../course.model';

const hostname = '/server/API';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<Course[]>(`${hostname}/courses`);
  }

  find(id: string): Observable<Course>{
    return this.http.get<Course>(`${hostname}/courses/${id}`);
  }

  getEnrolled(id: string): Observable<Student[]>{
    return this.http.get<Student[]>(`${hostname}/courses/${id}/enrolled`);
  }

  getAvailablesForCourse(courseId: string): Observable<Student[]> {
    return this.http.get<Student[]>(`${hostname}/courses/${courseId}/availables`);
  }
}
