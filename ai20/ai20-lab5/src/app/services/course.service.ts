import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Student} from '../models/student.model';
import {Course} from '../models/course.model';
import {CourseVmModel} from "../models/course-vm.model";
import {MatDialogRef} from "@angular/material/dialog";
import {AddCourseComponent} from "../teacher/add-course.component";
import {Router} from "@angular/router";
import {VmModel} from "../models/vm.model";
import {Group} from "../models/group.model";
import {VmImage} from "../models/vmImage.model";

const hostname = '/server/API/courses/';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient, private router: Router) { }

  getAll(){
    return this.http.get<Course[]>(`${hostname}teacher_courses`);
  }

  find(id: string): Observable<Course>{
    return this.http.get<Course>(`${hostname}${id}`);
  }

  getVmModel(courseId: string): Observable<VmModel>{
    return this.http.get<VmModel>(`${hostname}${courseId}/virtual_machine_model`);
  }

  getEnrolled(id: string): Observable<Student[]>{
    return this.http.get<Student[]>(`${hostname}${id}/enrolled`);
  }

  getAvailablesForCourse(courseId: string): Observable<Student[]> {
    return this.http.get<Student[]>(`${hostname}${courseId}/available_students`);
  }

  addCourse(courseVmModel: CourseVmModel): Observable<Course>{
    console.log('Aggiunta corso: ');
    console.log(courseVmModel);
    return this.http.post<Course>(hostname, courseVmModel);
  }

  enroll(courseId: string,student: Student){
    return this.http.post(hostname + courseId + '/enrollOne', student);
  }

  enrollMany(courseId: Course, file: any){
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(hostname + courseId + '/enrollMany', formData);
  }

  deleteStudent(courseId: string, student: Student){
    return this.http.delete(hostname + courseId + '/remove/' + student.id);
  }

  deleteCourse(courseId: string){
    return this.http.delete(hostname + courseId);
  }

  enableCourse(courseId: string){
    return this.http.post(hostname + courseId + '/enable', '');
  }

  disableCourse(courseId: string){
    return this.http.post(hostname + courseId + '/disable', '');
  }

  getAllEnabledTeams(courseId: string){
    return this.http.get<Group[]>(hostname + courseId + '/enabled_teams');
  }

  getAllTeamVms(courseId: string, teamId: string){
    return this.http.get<VmImage[]>(hostname + courseId + '/teams/' + teamId + '/virtual_machines');
  }

  connectVm(courseId: string, groupId: string, vmId: number){
    return this.http.get(hostname + courseId + '/teams/' + groupId + '/virtual_machines/' + vmId + '/image', {
      responseType: 'blob'
    });
  }

  editTeamLimits(courseId: string, groupId: string, limits: Group){
    return this.http.put(hostname + courseId + '/teams/' + groupId, limits);
  }

  getVmOwner(courseId: string, groupId: string, vmId: number): Observable<Student[]>{
    return this.http.get<Student[]>(hostname + courseId + '/teams/' + groupId + '/virtual_machines/' + vmId + '/owners');
  }



  getTeamRemainingResource(courseId: string, groupId: string){
    return this.http.get(hostname + courseId + '/teams/' + groupId + '/available_resources');
  }



}
