import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AssignmentService} from '../services/assignment.service';
import {DeliveryService} from '../services/delivery.service';
import {DialogData} from './dialogData.module';

@Component({
  selector: 'app-student-image-dialog',
  templateUrl: './student-image-dialog.component.html',
  styleUrls: ['./student-image-dialog.component.css']
})
export class StudentImageDialogComponent implements OnInit {

  image: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,
              private assignmentService: AssignmentService,
              private deliveryService: DeliveryService) { }

  ngOnInit(): void {
    if (this.data.delivery !== undefined) {
      this.deliveryService.getDeliveryImage
      (this.data.delivery.studentId, this.data.courseName, this.data.assignment, this.data.homework.id, this.data.delivery.id)
        .subscribe(data => this.createImageFromBlob(data));
    } else if (this.data.homework !== undefined) {
      // todo getVmImage and modify if
    } else {
      this.assignmentService.getAssignmentImageForStudent(this.data.studentId, this.data.courseName, this.data.assignment.id)
        .subscribe(data => this.createImageFromBlob(data));
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
