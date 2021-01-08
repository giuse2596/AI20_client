import { Component, OnInit } from '@angular/core';
import { Student } from '../models/student.model';
import { StudentService } from '../services/student.service';
import {Observable, Subscription} from 'rxjs';
import {CourseService} from '../services/course.service';
import {ActivatedRoute, Router} from "@angular/router";
import {Course} from "../models/course.model";




@Component({
  selector: 'app-students-cont',
  templateUrl: './students-cont.component.html',
  styleUrls: ['./students-cont.component.css']
})
export class StudentsContComponent implements OnInit {

   students$: Observable<Student[]>;
   enrolledStudents$: Observable<Student[]>;
   subscription: Subscription;
   courseSelected$: Observable<Course>;

  constructor(private studentService: StudentService,
              private courseService: CourseService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.courseSelected$ = this.courseService.find(this.route.snapshot.params.courseId);
    this.students$ = this.studentService.query();
    this.enrolledStudents$ = this.courseService.getEnrolled(this.route.snapshot.params.courseId);
   /* this.subscription = this.router.events.subscribe(val => {
      this.courseSelected$ = this.courseService.find(this.route.snapshot.params.courseId);
      this.students$ = this.studentService.query();
      this.enrolledStudents$ = this.courseService.getEnrolled(this.route.snapshot.params.courseId);
    });*/
  }

  getStudents(): Observable<Student[]>{
    return this.studentService.query();
  }

  getEnrolled(): Observable<Student[]>{
    return this.courseService.getEnrolled(this.route.snapshot.params.courseId);
  }

  enrollStudent(toAdd: Student[]){
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
          this.courseService.deleteStudent(this.route.snapshot.params.courseId, s).subscribe(
            () => {
              this.enrolledStudents$ = this.getEnrolled();
            });
        }
      );
    }
  }

  uploadMany(csvFile: File){
    console.log(csvFile);
    this.courseService.enrollMany(this.route.snapshot.params.courseId,csvFile).subscribe(
      value => {
        this.enrolledStudents$ = this.getEnrolled();
      },
      error => {
        console.log(error);
      }
    )
  }

  /*ngOnDestroy(){
    this.subscription.unsubscribe();
  }*/

}
