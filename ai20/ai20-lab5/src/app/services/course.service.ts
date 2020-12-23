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

const hostname = '/server/API';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient, private router: Router) { }

  getAll(){
    return this.http.get<Course[]>(`${hostname}/courses/teacher_courses`);
  }

  find(id: string): Observable<Course>{
    return this.http.get<Course>(`${hostname}/courses/${id}`);
  }

  getVmModel(courseId: string): Observable<VmModel>{
    return this.http.get<VmModel>(`${hostname}/courses/${courseId}/virtual_machine_model`);
  }

  getEnrolled(id: string): Observable<Student[]>{
    return this.http.get<Student[]>(`${hostname}/courses/${id}/enrolled`);
  }

  getAvailablesForCourse(courseId: string): Observable<Student[]> {
    return this.http.get<Student[]>(`${hostname}/courses/${courseId}/availables`);
  }

  addCourse(courseVmModel: CourseVmModel): Observable<Course>{
    console.log('Aggiunta corso: ');
    console.log(courseVmModel);
    return this.http.post<Course>(hostname + '/courses', courseVmModel);
  }

  enroll(courseId: string,student: Student){
    return this.http.post(hostname + '/courses/' + courseId + '/enrollOne', student);
  }

  enrollMany(courseId: Course, file: any){
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(hostname + '/courses/' + courseId + '/enrollMany', formData);
  }

  deleteStudent(courseId: string, student: Student){
    return this.http.delete(hostname + '/courses/' + courseId + '/remove/' + student.id);
  }

  deleteCourse(courseId: string){
    return this.http.delete(hostname + '/courses/' + courseId);
  }

  enableCourse(courseId: string){
    return this.http.post(hostname + '/courses/' + courseId + '/enable', '');
  }

  disableCourse(courseId: string){
    return this.http.post(hostname + '/courses/' + courseId + '/disable', '');
  }

}
