import {Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CourseService} from "../../services/course.service";
import {Course} from "../../models/course.model";
import {VmModel} from "../../models/vm.model";
import {CourseVmModel} from "../../models/course-vm.model";
import {Router} from "@angular/router";
import {DialogData} from "../../auth/dialogData.module";
@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  courseForm: FormGroup =  this.builder.group({
    name: ['', Validators.required],
    acronym: ['',Validators.required],
    min: [2, [Validators.required, Validators.min(2)]],
    max: [2, [Validators.required, Validators.min(2)]],
    maxCpu: [1, [Validators.required, Validators.min(1)]],
    maxRam: [1, [Validators.required, Validators.min(1)]],
    maxDisk: [1, [Validators.required, Validators.min(1)]],
    maxInstances: [1, [Validators.required, Validators.min(1)]],
    activeInstances: [1, [Validators.required, Validators.min(1)]],
  });



  constructor(public dialogRef: MatDialogRef<AddCourseComponent>,
              private builder: FormBuilder,
              private courseService: CourseService,
              private router: Router,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit(): void {
  }

  onNoClick(): void{
    this.dialogRef.close({ result: true});
  }

  get name(){
    return this.courseForm.get('name');
  }

  get acronym(){
    return this.courseForm.get('acronym');
  }

  get min(){
    return this.courseForm.get('min');
  }

  get max(){
    return this.courseForm.get('max');
  }

  get maxCpu(){
    return this.courseForm.get('maxCpu');
  }

  get maxRam(){
    return this.courseForm.get('maxRam');
  }

  get maxDisk(){
    return this.courseForm.get('maxDisk');
  }

  get maxInstances(){
    return this.courseForm.get('maxInstances');
  }

  get activeInstances(){
    return this.courseForm.get('activeInstances');
  }

  addCourse(){
    if(this.max.value >= this.min.value) {
      const course = new Course(this.name.value, this.name.value, this.acronym.value, [],
        false, this.min.value, this.max.value);
      const vm = new VmModel(this.maxCpu.value, this.maxRam.value, this.maxDisk.value,
        this.maxInstances.value, this.activeInstances.value);
      this.courseService.addCourse(new CourseVmModel(course, vm)).subscribe(
        res => {
          this.dialogRef.close({result: true});
        },
        error => {
          this.dialogRef.close({
            result: false,
            message: error.error.message
          });
        }
      );
    }else{
      this.max.setErrors({'min': true});
    }
  }

}
