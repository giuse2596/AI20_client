import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Course} from "../../models/course.model";
import {VmModel} from "../../models/vm.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Teacher} from "../../models/teacher.model";



@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {

  selected: Course;
  optionSelected: Teacher;
  @Input()
  teachers: Teacher[] = [];

  @Input()
  set course(selected: Course){
    if(selected != null){
      this.selected = selected;
      this.courseForm.get('min').setValue(this.selected.min);
      this.courseForm.get('max').setValue(this.selected.max);
    }
  }

  @Input() vmModel: VmModel;

  courseForm: FormGroup = this.builder.group({
    min: [2, [Validators.required, Validators.min(2), Validators.max(10)]],
    max: [2, [Validators.required, Validators.min(2), Validators.max(10)]],
  });

  @Output() deleteCourseEvent = new EventEmitter<Course>();
  @Output() changeCourseStatus = new EventEmitter<Course>();
  @Output() addTeacher = new EventEmitter<Teacher>();
  @Output() modifyLimits = new  EventEmitter<Course>();

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

  displayFn(teacher: Teacher): string{
    return  teacher.name + ' '
      + teacher.firstName + ' (' + teacher.id + ')';
  }


  save(option: Teacher){
    console.log(option);
    this.optionSelected = option;
  }

  add(){
    this.addTeacher.emit(this.optionSelected);
  }

  modify(course: Course){
    if(this.max.value >= this.min.value){
      course.min = this.min.value;
      course.max = this.max.value;
      this.modifyLimits.emit(course);
    }else {
      this.max.setErrors({'min': true});
    }
  }

}
