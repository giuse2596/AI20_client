import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vms',
  templateUrl: './vms.component.html',
  styleUrls: ['./vms.component.css']
})
export class VmsComponent implements OnInit {

  panelOpenState = false;

  testList: string[] = [
    'test1',
    'test2',
    'test3'
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
