import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {MessageComponent} from "../message.component";
import {typeofExpr} from "@angular/compiler/src/output/output_ast";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private messageBar: MatSnackBar) { }

  printMessage(type: boolean, message: string){
    this.messageBar.openFromComponent(MessageComponent, {
      duration: 4000,
      horizontalPosition: "center",
      verticalPosition: "top",
      panelClass: type ? 'result-bar-success' : 'result-bar-fail',
      data: {
        'message': message
      }
    })
  }
}
