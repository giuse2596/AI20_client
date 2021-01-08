import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {VmImage} from "../models/vmImage.model";
import {Course} from "../models/course.model";

@Component({
  selector: 'app-student-vms',
  templateUrl: './student-vms.component.html',
  styleUrls: ['./student-vms.component.css']
})
export class StudentVmsComponent implements OnInit {

  @Input() vms: VmImage[] = [];
  @Input() error: string = '';
  @Input() active: boolean;
  @Input() studentId: string;
  @Input() selected: Course;
  @Output() openDialogEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() connectVmEvent: EventEmitter<VmImage> = new EventEmitter<VmImage>();
  @Output() startEvent: EventEmitter<VmImage> = new EventEmitter<VmImage>();
  @Output() stopEvent: EventEmitter<VmImage> = new EventEmitter<VmImage>();
  @Output() deleteEvent: EventEmitter<VmImage> = new EventEmitter<VmImage>();
  @Output() editEvent: EventEmitter<VmImage> = new EventEmitter<VmImage>();

  constructor() { }


  ngOnInit(): void {
  }

  checkOwnership(vm: VmImage): boolean{
    if(vm.owners) {
      return vm.owners.map(o => o.id).includes(this.studentId);
    }
  }

  open(){
    console.log(this.vms);
    this.openDialogEvent.emit();
  }

  start(vm: VmImage){
    this.startEvent.emit(vm);
  }

  stop(vm: VmImage){
    this.stopEvent.emit(vm);
  }

  connect(vm: VmImage){
    this.connectVmEvent.emit(vm);
  }

  delete(vm: VmImage){
    this.deleteEvent.emit(vm);
  }

  openEdit(vm: VmImage){
    this.editEvent.emit(vm);
  }


}
