import { Injectable } from '@angular/core';
import { Student } from '../student.model';
import { of, Observable, concat } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { concatMap, filter, map, tap, toArray, flatMap, mergeMap } from 'rxjs/operators';

const hostname = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class StudentService {



  constructor(private http: HttpClient) { }

  find(id: string): Observable<Student>{
    return this.http.get<Student>(hostname + '/students/${id}');
  }

  query(): Observable<Student[]>{
    return this.http.get<Student[]>(hostname + '/students');
  }


  create(student: Student): Observable<Student[]>{
    return this.http.post<Student[]>(hostname + '/students', student);
  }

  update(student: Student): Observable<Student[]>{
     return this.http.put<Student[]>(hostname + '/students/' + student.id, student);
  }

  delete(id: string): Observable<Student>{
    return this.http.delete<Student>(hostname + '/' + id);
  }

  updateEnrolled(students: Student[]): Observable<Student[]>{
     return of(students).pipe(
      flatMap(st => st),
      concatMap(s => this.http.put(hostname + '/students/' + s.id, s)),
      toArray<Student>()
    );
  }

  getEnrolled(courseId: string): Observable<Student[]>{
    return this.query().pipe(
      map(a => a.filter(s => s.courseId === courseId))
    );
  }
}
