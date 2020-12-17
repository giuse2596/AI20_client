import { Component, OnInit } from '@angular/core';
import { Student } from '../models/student.model';
import { StudentService } from '../services/student.service';
import { Observable } from 'rxjs';
import {CourseService} from '../services/course.service';
import {ActivatedRoute, Router} from "@angular/router";




@Component({
  selector: 'app-students-cont',
  templateUrl: './students-cont.component.html',
  styleUrls: ['./students-cont.component.css']
})
export class StudentsContComponent implements OnInit {

   students$: Observable<Student[]>;
   enrolledStudents$: Observable<Student[]>;

  constructor(private studentService: StudentService,
              private courseService: CourseService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.students$ = this.studentService.query();
    this.enrolledStudents$ = this.courseService.getEnrolled(this.route.snapshot.params.courseId);
    this.router.events.subscribe(val => {
      this.students$ = this.studentService.query();
      this.enrolledStudents$ = this.courseService.getEnrolled(this.route.snapshot.params.courseId);
    });
  }

  getStudents(): Observable<Student[]>{
    return this.studentService.query();
  }

  getEnrolled(): Observable<Student[]>{
    return this.courseService.getEnrolled(this.route.snapshot.params.courseId);
  }

  enrollStudent(toAdd: Student[]){
    console.log(toAdd);
    //toAdd.forEach(s => s.courses.concat(this.route.snapshot.params.courseId));
    this.courseService.enroll(this.route.snapshot.params.courseId, toAdd[0]).subscribe(
      () => {
        this.enrolledStudents$ = this.getEnrolled();
      }
    );
  }

  deleteStudents(toDelete: Student[]){
    if (toDelete){
      console.log(toDelete);
      toDelete.forEach(
        s => {
          /*const index = s.courses.indexOf(this.route.snapshot.params.courseId);
          if (index !== -1) {
            s.courses.splice(index, 1);
          }*/
          this.courseService.delete(this.route.snapshot.params.courseId, s).subscribe(
            () => {
              this.enrolledStudents$ = this.getEnrolled();
            });
        }
      );
      /*this.studentService.updateEnrolled(toDelete).subscribe(
        () => {
        this.enrolledStudents$ = this.getEnrolled();
      }
    );*/
  }
    /*
    toDelete.forEach(s => this.enrolledStudents.splice(this.enrolledStudents.indexOf(s), 1));
    this.enrolledStudents = Array.from(this.enrolledStudents);
    */
  }


}
