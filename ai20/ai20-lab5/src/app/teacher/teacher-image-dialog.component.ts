import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogData} from './dialogData.module';
import {AssignmentService} from '../services/assignment.service';
import {DeliveryService} from '../services/delivery.service';

@Component({
  selector: 'app-teacher-image-dialog',
  templateUrl: './teacher-image-dialog.component.html',
  styleUrls: ['./teacher-image-dialog.component.css']
})
export class TeacherImageDialogComponent implements OnInit {

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
      this.assignmentService.getAssignmentImageForTeacher(this.data.courseName, this.data.assignment.id)
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
