import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogData} from './dialogData.module';
import {TaskService} from '../services/task.service';

@Component({
  selector: 'app-correct-dialog',
  templateUrl: './correct-dialog.component.html',
  styleUrls: ['./correct-dialog.component.css']
})
export class CorrectDialogComponent implements OnInit {
  nowDate: Date;
  taskToRedo = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,
              private taskService: TaskService) { }

  ngOnInit(): void {
    this.nowDate = new Date();
  }

  confirmCorrection() {
    if (this.taskToRedo) {
      this.data.task.state = 'LETTO';
    } else {
      this.data.task.state = 'RIVISTO';
    }
    this.data.task.timestamp = new Date();
    this.taskService.updateTask(this.data.task);
  }
}
