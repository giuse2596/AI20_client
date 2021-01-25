import {Component, Inject, OnInit} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from "@angular/material/snack-bar";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styles: [
  ]
})
export class MessageComponent implements OnInit {

  message: string = "";

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data) {
    this.message = data.message;
  }


  ngOnInit(): void {
  }

}
