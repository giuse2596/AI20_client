import { Injectable } from '@angular/core';
import { Student } from '../student.model';
import {of, Observable, concat, forkJoin} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { concatMap, filter, map, tap, toArray, flatMap, mergeMap } from 'rxjs/operators';
import {Request} from '../request.model';
import {Group} from '../group.model';

const hostname = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class StudentService {



  constructor(private http: HttpClient) { }

  find(id: string): Observable<Student>{
    return this.http.get<Student>(`${hostname}/students/${id}`);
  }

  query(): Observable<Student[]>{
    return this.http.get<Student[]>(`${hostname}/students`);
  }


  create(student: Student): Observable<Student[]>{
    return this.http.post<Student[]>(`${hostname}/students`, student);
  }

  update(student: Student): Observable<Student[]>{
     return this.http.put<Student[]>(`${hostname}/students/${student.id}`, student);
  }

  delete(id: string): Observable<Student>{
    return this.http.delete<Student>(`${hostname}/students/${id}`);
  }

  updateEnrolled(students: Student[]): Observable<Student[]>{
     return of(students).pipe(
      flatMap(st => st),
      concatMap(s => this.http.put(`${hostname}/students/${s.id}`, s)),
      toArray<Student>()
    );
  }

  getGroupMembers(groupId: string): Observable<Student[]> {
    return this.http.get<Student[]>(`${hostname}/groups/${groupId}/students`);
  }

  getGroupForCourse(studentId: string, courseId: string): Observable<Group> {
    return this.http.get<Group>(`${hostname}/students/${studentId}/courses/${courseId}/groups`);
  }

  proposeTeam(request: Request) {
    this.http.post(`${hostname}/groups`, request);
  }

  getPendingGroupsForCourse(courseId: string): Observable<Request[]> {
    return this.http.get<Request[]>(`${hostname}/courses/${courseId}/requests`);
  }

  getRequestMembers(request: Request): Observable<Student[]> {
    const listObservable: Observable<Student>[] = [];
    for (const memberId of request.members) {
      listObservable.push(this.find(memberId));
    }
    return forkJoin(listObservable);
  }
}
