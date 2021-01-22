import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-confirm-disclaimer',
  templateUrl: './confirm-disclaimer.component.html',
  styleUrls: ['./confirm-disclaimer.component.css']
})
export class ConfirmDisclaimerComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmDisclaimerComponent>) { }

  ngOnInit(): void {
  }

  onNoClick(){
    this.dialogRef.close(false);
  }

  delete(){
    this.dialogRef.close(true);
  }

}
