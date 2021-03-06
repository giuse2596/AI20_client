import { Component, OnInit } from '@angular/core';
import { Student } from '../../models/student.model';
import { StudentService } from '../../services/student.service';
import {Observable, Subscription} from 'rxjs';
import {CourseService} from '../../services/course.service';
import {ActivatedRoute, Router} from "@angular/router";
import {Course} from "../../models/course.model";
import {MessageService} from "../../services/message.service";




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
              private router: Router,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.courseSelected$ = this.courseService.find(this.route.snapshot.params.courseId);
    this.students$ = this.studentService.query();
    this.enrolledStudents$ = this.courseService.getEnrolled(this.route.snapshot.params.courseId);
  }

  getStudents(): Observable<Student[]>{
    return this.studentService.query();
  }

  getEnrolled(): Observable<Student[]>{
    return this.courseService.getEnrolled(this.route.snapshot.params.courseId);
  }

  enrollStudent(toAdd: Student[]){
    this.courseService.enroll(this.route.snapshot.params.courseId, toAdd[0]).subscribe(
      value => {
        this.enrolledStudents$ = this.getEnrolled();
        this.messageService.printMessage(true, 'Studente iscritto con successo');
      },
      error => {
        this.messageService.printMessage(false, 'Studente non valido o già iscritto al corso');
      }
    );
  }

  deleteStudents(toDelete: Student[]){
    let ok: boolean = true;
    if (toDelete){
      toDelete.forEach(
        s => {
          this.courseService.deleteStudent(this.route.snapshot.params.courseId, s).subscribe(
            () => {
              this.enrolledStudents$ = this.getEnrolled();
            },
            error => {
              ok = false;
            });
        }
      );
      this.messageService.printMessage(ok, ok ? 'Studenti eliminati con successo' : 'Si è verificato un errore. ' +
        'Uno o più studenti potrebbero non essere stati eliminati');
    }
  }

  uploadMany(csvFile: File){
    console.log(csvFile);
    this.courseService.enrollMany(this.route.snapshot.params.courseId,csvFile).subscribe(
      value => {
        if (value && Array.from(value).includes(false)){
          this.messageService.printMessage(false, 'Alcuni studenti potrebbero non essere stati aggiunti ' +
            'perchè già presenti o non esistenti');
          this.enrolledStudents$ = this.getEnrolled();
        }else if(!Array.from(value).includes(false)){
          this.messageService.printMessage(true, 'Studenti aggiunti con successo');
          this.enrolledStudents$ = this.getEnrolled();
        }


      },
      error => {
        this.messageService.printMessage(false, 'Si è verificato un errore. Riprova');
      }
    )
  }

  /*ngOnDestroy(){
    this.subscription.unsubscribe();
  }*/

}
