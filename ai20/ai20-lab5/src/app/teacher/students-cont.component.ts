import { Component, OnInit } from '@angular/core';
import { Student } from '../student.model';
import { StudentService } from '../services/student.service';
import { Observable } from 'rxjs';
import {CourseService} from '../services/course.service';




@Component({
  selector: 'app-students-cont',
  templateUrl: './students-cont.component.html',
  styleUrls: ['./students-cont.component.css']
})
export class StudentsContComponent implements OnInit {

   students$: Observable<Student[]>;
   enrolledStudents$: Observable<Student[]>;

  constructor(private studentService: StudentService, private courseService: CourseService) { }

  ngOnInit(): void {
    this.students$ = this.studentService.query();
    this.enrolledStudents$ = this.courseService.getEnrolled('Applicazioni Internet');
  }

  getStudents(): Observable<Student[]>{
    return this.studentService.query();
  }

  getEnrolled(): Observable<Student[]>{
    return this.courseService.getEnrolled('Applicazioni Internet');
  }

  enrollStudent(toAdd: Student[]){
    console.log(toAdd);
    toAdd.forEach(s => s.courses.concat('Applicazioni Internet'));
    this.studentService.updateEnrolled(toAdd).subscribe(
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
          const index = s.courses.indexOf('Applicazioni Internet');
          if (index !== -1) {
            s.courses.splice(index, 1);
          }
        }
      );
      this.studentService.updateEnrolled(toDelete).subscribe(
        () => {
        this.enrolledStudents$ = this.getEnrolled();
      }
    );
  }
    /*
    toDelete.forEach(s => this.enrolledStudents.splice(this.enrolledStudents.indexOf(s), 1));
    this.enrolledStudents = Array.from(this.enrolledStudents);
    */
  }

}
