import { Injectable } from '@angular/core';
import { Student } from '../models/student.model';
import {of, Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import { concatMap, toArray, flatMap} from 'rxjs/operators';
import {Group} from '../models/group.model';
import {Course} from '../models/course.model';
import {MatDialogRef} from '@angular/material/dialog';
import {GroupNameDialogComponent} from '../student/teams/group-name-dialog.component';
import {VmImage} from "../models/vmImage.model";

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

  getGroupForCourse(studentId: string, courseId: string): Observable<Group[]> {
    return this.http.get<Group[]>(`${hostnameCourses}/${courseId}/student_enabled_teams`);
  }

  proposeTeam(courseName: string, groupName: string, proposer: string, timeoutMillis: number,
              members: string[], dialogRef: MatDialogRef<GroupNameDialogComponent>) {
    const params = new HttpParams()
      .set('expiryOffset', timeoutMillis.toString());
    this.http.post(`${hostnameNotification}/propose/${courseName}/${groupName}/${proposer}`, members, {params})
      .subscribe(() => {
          dialogRef.close();
        },
        err => {
          dialogRef.close(err.error.message);
        });
  }

  getPendingGroupsForCourse(courseName: string): Observable<Group[]> {
    return this.http.get<Group[]>(`${hostnameCourses}/${courseName}/student_not_enabled_teams`);
  }

  getCourses(studentId: string): Observable<Course[]> {
    return this.http.get<Course[]>(`${hostnameStudents}/${studentId}/courses`);
  }

  getMembersWhoAccepted(studentId: string, groupId: string): Observable<Student[]> {
    return this.http.get<Student[]>(`${hostnameStudents}/${studentId}/teams/${groupId}/confirmed_members`);
  }

  createVm(studentId: string, groupId: string, vmImage: VmImage){
    return this.http.post<any>(`${hostnameStudents}/${studentId}/teams/${groupId}/virtual_machines`, vmImage);
  }

  modifyVm(studentId: string, groupId: string, vmImage: VmImage){
    return this.http.put<any>(`${hostnameStudents}/${studentId}/teams/${groupId}/virtual_machines/${vmImage.id}/modify`, vmImage);
  }

  startVm(studentId: string, groupId: string, vmId: number){
    return this.http.put<any>(`${hostnameStudents}/${studentId}/teams/${groupId}/virtual_machines/${vmId}/start`, '');
  }

  stopVm(studentId: string, groupId: string, vmId: number){
    return this.http.put<any>(`${hostnameStudents}/${studentId}/teams/${groupId}/virtual_machines/${vmId}/stop`, '');
  }

  deleteVm(studentId: string, groupId: string, vmId: number){
    return this.http.delete<any>(`${hostnameStudents}/${studentId}/teams/${groupId}/virtual_machines/${vmId}/delete`);
  }

  addOwners(studentId: string, groupId: string, vmId: number, members: string[]){
    return this.http.put(`${hostnameStudents}/${studentId}/teams/${groupId}/virtual_machines/${vmId}/add_owners` ,members)
  }




}
