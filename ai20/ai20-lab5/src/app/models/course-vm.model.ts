import {Course} from "./course.model";
import {VmModel} from "./vm.model";

export class CourseVmModel{

  courseDTO: Course;
  vmModelDTO: VmModel;

  constructor(course: Course, vmModel: VmModel) {
    this.courseDTO = course;
    this.vmModelDTO = vmModel;
  }

}
