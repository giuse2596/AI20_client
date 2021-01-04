import {Component, Input, OnInit} from '@angular/core';
import {Group} from "../models/group.model";

@Component({
  selector: 'app-vms',
  templateUrl: './vms.component.html',
  styleUrls: ['./vms.component.css']
})
export class VmsComponent implements OnInit {

  panelOpenState = false;

  @Input() teamList: Group[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
