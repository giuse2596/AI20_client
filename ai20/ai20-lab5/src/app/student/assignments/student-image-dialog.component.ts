import {Component, HostListener, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AssignmentService} from '../../services/assignment.service';
import {DeliveryService} from '../../services/delivery.service';
import {DialogData} from '../dialogData.module';

@Component({
  selector: 'app-student-image-dialog',
  templateUrl: './student-image-dialog.component.html',
  styleUrls: ['./student-image-dialog.component.css']
})
export class StudentImageDialogComponent implements OnInit {

  image: any;
  result: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,
              private assignmentService: AssignmentService,
              private deliveryService: DeliveryService,
              public dialogRef: MatDialogRef<StudentImageDialogComponent>) {
    dialogRef.disableClose = true;
    // chiudo manualmente la dialog per passare result al chiamante
    dialogRef.backdropClick().subscribe(_ => { // chiusura quando si clicca sullo sfondo
      this.dialogRef.close(this.result);
    });
  }

  @HostListener('window:keyup.esc') onKeyUp() {
    this.dialogRef.close(this.result); // chiusura quando si preme esc
  }

  close() {
    this.dialogRef.close(this.result);
  }

  ngOnInit(): void {
    if (this.data.delivery !== undefined) {
      this.deliveryService.getDeliveryImage
      (this.data.delivery.studentId, this.data.courseName, this.data.assignment, this.data.homework.id, this.data.delivery.id)
        .subscribe(data => {
          this.createImageFromBlob(data);
        });
    } else {
      this.assignmentService.getAssignmentImageForStudent(this.data.studentId, this.data.assignment.id)
        .subscribe(data => {
          this.createImageFromBlob(data);
          this.result = this.data.assignment.id;
        });
    }
  }

  private createImageFromBlob(data: Blob) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.image = reader.result;
    }, false);

    if (data) {
      reader.readAsDataURL(data);
    }
  }
}
