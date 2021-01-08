import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Course} from "../models/course.model";
import {VmModel} from "../models/vm.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";



@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {

  selected: Course;
  @Input()
  set course(selected: Course){
    if(selected != null){
      this.selected = selected;
      this.courseForm.get('min').setValue(this.selected.min);
      this.courseForm.get('max').setValue(this.selected.max);
      console.log(selected);
    }
  }

  @Input() vmModel: VmModel;

  courseForm: FormGroup = this.builder.group({
    min: [1, [Validators.required, Validators.min(1), Validators.max(10)]],
    max: [1, [Validators.required, Validators.min(1), Validators.max(10)]],
  });

  @Output() deleteCourseEvent = new EventEmitter<Course>();
  @Output() changeCourseStatus = new EventEmitter<Course>();

  constructor(private builder: FormBuilder) { }

  ngOnInit(): void {
  }

  get min(){
    return this.courseForm.get('min');
  }

  get max(){
    return this.courseForm.get('max');
  }

  changeStatus(checked: boolean, course: Course){
    course.enabled = checked;
    this.changeCourseStatus.emit(course);
  }

  deleteCourse(){
    this.deleteCourseEvent.emit();
  }
}
