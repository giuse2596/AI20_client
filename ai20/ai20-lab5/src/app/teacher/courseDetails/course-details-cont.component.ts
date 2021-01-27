import { Component, OnInit } from '@angular/core';
import {Course} from "../../models/course.model";
import {VmModel} from "../../models/vm.model";
import {CourseService} from "../../services/course.service";
import {Observable, Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ConfirmDisclaimerComponent} from "./confirm-disclaimer.component";
import {Teacher} from "../../models/teacher.model";
import {MessageService} from "../../services/message.service";

@Component({
  selector: 'app-course-details-cont',
  templateUrl: './course-details-cont.component.html',
  styleUrls: ['./course-details-cont.component.css']
})
export class CourseDetailsContComponent implements OnInit {

  selected$ : Observable<Course>;
  vmModel$: Observable<VmModel>;
  subscription: Subscription;
  courseId: string;
  success: boolean;
  teachers$: Observable<Teacher[]>;

  constructor(private courseService: CourseService,
              private router: Router,
              private route: ActivatedRoute,
              private dialog: MatDialog,
              private messageService: MessageService) {}

  ngOnInit(): void {
   this.courseId = this.route.snapshot.params.courseId;
   this.selected$ = this.courseService.find(this.courseId);
   this.vmModel$ = this.courseService.getVmModel(this.courseId);
   this.teachers$ = this.courseService.getTeacherNotInCourse(this.courseId);
  }

  updateCourse(event: Course){
    console.log(event);
    this.courseService.editCourse(this.courseId, event).subscribe(
        value => {
            this.router.navigate(['/teacher/courses/' + this.courseId + '/students']);
            this.messageService.printMessage(true, 'Corso modificato con successo');
        },
        error => {
            this.messageService.printMessage(false, 'Si è verificato un errore nella modifica. Riprovare');
        }
      )
    }

  deleteCourse(){
    console.log("delete");
    this.dialog.open(ConfirmDisclaimerComponent, {
      height: "300px"
    }).afterClosed().subscribe(
      val => {
        if(val === true){
          this.courseService.deleteCourse(this.courseId).subscribe(
            val => {
              this.router.navigate(['/home'], {queryParams: { doDelete: true }})
              this.messageService.printMessage(true,'Corso eliminato con successo');
            },
            error => {
              this.messageService.printMessage(false, 'Si è verificato un errore. Riprova.');
            }
          )
        }
      }
    )
  }

  addTeacher(teacher: Teacher){
    if(teacher){
      this.courseService.addTeacher(this.courseId, teacher).subscribe(
        value => {
          this.router.navigate(["/home"]);
          this.messageService.printMessage(true, 'insegnante aggiunto con successo');
        },
        error => {
          this.messageService.printMessage(false, 'Si è verificato un errore. Riprova.');
        }
      );
    }else
      this.messageService.printMessage(false, 'Il valore inserito non è valido');

  }

 /* ngOnDestroy(){
    this.subscription.unsubscribe();
  }*/

}
