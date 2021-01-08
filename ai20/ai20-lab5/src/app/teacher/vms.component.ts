import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Group} from "../models/group.model";
import {VmImage} from "../models/vmImage.model";

@Component({
  selector: 'app-vms',
  templateUrl: './vms.component.html',
  styleUrls: ['./vms.component.css']
})
export class VmsComponent implements OnInit {

  panelOpenState = false;

  @Input() teamList: Group[] = [];
  @Output() connectVmEvent: EventEmitter<VmImage> = new EventEmitter<VmImage>();
  @Output() editResourcesEvent: EventEmitter<Group> = new EventEmitter<Group>();

  constructor() { }

  ngOnInit(): void {
  }

  connect(vm: VmImage, team: Group){
    vm.teamId = team.id;
    this.connectVmEvent.emit(vm);
  }

  editResources(team: Group){
    this.editResourcesEvent.emit(team);
  }


}
