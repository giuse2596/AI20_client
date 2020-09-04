import { Component, OnInit } from '@angular/core';
import { Student } from '../student.model';
import { StudentService } from '../services/student.service';
import { Observable } from 'rxjs';




@Component({
  selector: 'app-students-cont',
  templateUrl: './students-cont.component.html',
  styleUrls: ['./students-cont.component.css']
})
export class StudentsContComponent implements OnInit {

   students$: Observable<Student[]>;
   enrolledStudents$: Observable<Student[]>;

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.students$ = this.studentService.query();
    this.enrolledStudents$ = this.studentService.getEnrolled('Applicazioni Internet');
  }

  getStudents(): Observable<Student[]>{
    return this.studentService.query();
  }

  getEnrolled(): Observable<Student[]>{

    return this.studentService.getEnrolled('Applicazioni Internet');
  }

  enrollStudent(toAdd: Student[]){
    console.log(toAdd);
    toAdd.forEach(s => s.courseId = 'Applicazioni Internet');
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
        s => s.courseId = '0'
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
