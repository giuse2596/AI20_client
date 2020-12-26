import { Injectable } from '@angular/core';
import { Student } from '../models/student.model';
import {of, Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { concatMap, toArray, flatMap} from 'rxjs/operators';
import {Group} from '../models/group.model';
import {Course} from '../models/course.model';
import {MatDialogRef} from '@angular/material/dialog';
import {GroupNameDialogComponent} from '../student/group-name-dialog.component';

const hostnameStudents = '/server/API/students';
const hostnameCourses = '/server/API/courses';
const hostnameNotification = '/server/notification';

@Injectable({
  providedIn: 'root'
})
export class StudentService {



  constructor(private http: HttpClient) { }

  find(id: string): Observable<Student>{
    return this.http.get<Student>(`${hostnameStudents}/${id}`);
  }

  query(): Observable<Student[]>{
    return this.http.get<Student[]>(`${hostnameStudents}`);
  }


  create(student: Student): Observable<Student[]>{
    return this.http.post<Student[]>(`${hostnameStudents}`, student);
  }

  update(student: Student): Observable<Student[]>{
    return this.http.put<Student[]>(`${hostnameStudents}/${student.id}`, student);
  }

  delete(id: string): Observable<Student>{
    return this.http.delete<Student>(`${hostnameStudents}/${id}`);
  }

  updateEnrolled(students: Student[]): Observable<Student[]>{
    return of(students).pipe(
      flatMap(st => st),
      concatMap(s => this.http.post(`${hostnameStudents}/${s.id}`, s)),
      toArray<Student>()
    );
  }

  getGroupMembers(courseName: string, groupId: string): Observable<Student[]> {
    return this.http.get<Student[]>(`${hostnameCourses}/${courseName}/teams/${groupId}`);
  }

  getGroupForCourse(studentId: string, courseId: string): Observable<Group> {
    return this.http.get<Group>(`${hostnameStudents}/${studentId}/teams/${courseId}`);
  }

  proposeTeam(courseName: string, group: Group, dialogRef: MatDialogRef<GroupNameDialogComponent>) {
    this.http.post(`${hostnameNotification}/propose/${courseName}/${group.name}/${group.proposer}`, group)
      .subscribe(() => {
          dialogRef.close();
        },
        err => {
          dialogRef.close(err.error.message);
        });
  }

  getPendingGroupsForCourse(courseName: string): Observable<Group[]> {
    return this.http.get<Group[]>(`${hostnameCourses}/${courseName}/teams/not_enabled`);
  }

  getCourses(studentId: string): Observable<Course[]> {
    return this.http.get<Course[]>(`${hostnameStudents}/${studentId}/courses`);
  }

  getMembersWhoAccepted(studentId: string, groupId: string): Observable<Student[]> {
    return this.http.get<Student[]>(`${hostnameStudents}/${studentId}/teams/${groupId}/confirmed_members`);
  }
}
