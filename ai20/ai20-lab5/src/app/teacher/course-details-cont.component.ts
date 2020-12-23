import { Component, OnInit } from '@angular/core';
import {Course} from "../models/course.model";
import {VmModel} from "../models/vm.model";
import {CourseService} from "../services/course.service";
import {Observable, Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ConfirmDisclaimerComponent} from "./confirm-disclaimer.component";

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

  constructor(private courseService: CourseService,
              private router: Router,
              private route: ActivatedRoute,
              private dialog: MatDialog) {}

  ngOnInit(): void {
   this.courseId = this.route.snapshot.params.courseId;
   this.selected$ = this.courseService.find(this.courseId);
   this.vmModel$ = this.courseService.getVmModel(this.courseId);
   this.subscription = this.router.events.subscribe(
      val => {
        this.courseId = this.route.snapshot.params.courseId;
        this.vmModel$ = this.courseService.getVmModel(this.courseId);
        this.selected$ = this.courseService.find(this.courseId);
      }
    );
  }

  changeStatus(event){
    if(event === true){
      this.courseService.enableCourse(this.courseId).subscribe(
        value => {
            this.router.navigate(['/teacher/courses/' + this.courseId + '/students']);
        },
        error => {

        }
      )
    }else{
      this.courseService.disableCourse(this.courseId).subscribe(
        value => {
          this.router.navigate(['/teacher/courses/' + this.courseId + '/students']);
        },
        error => {

        }
      );
    }
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
            },
            error => {

            }
          )
        }
      }
    )
  }

 /* ngOnDestroy(){
    this.subscription.unsubscribe();
  }*/

}
