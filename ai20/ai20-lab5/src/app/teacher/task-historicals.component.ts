import {Component, Input, OnInit} from '@angular/core';
import {Task} from '../task.model';
import {CorrectDialogComponent} from './correct-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {Assignment} from '../assignment.model';
import {TaskHistorical} from '../taskHistorical.model';
import {TaskService} from '../services/task.service';

@Component({
  selector: 'app-task-historicals',
  templateUrl: './task-historicals.component.html',
  styleUrls: ['./task-historicals.component.css']
})
export class TaskHistoricalsComponent implements OnInit {
  @Input() task: Task;
  @Input() assignment: Assignment;
  taskHistoricals: TaskHistorical[];

  constructor(public dialog: MatDialog,
              private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getHistoricalsForTask(this.task)
      .subscribe(taskHistoricals => this.taskHistoricals = taskHistoricals);
  }

  correct() {
    this.dialog.open(CorrectDialogComponent, {data: {
        task: this.task,
        assignment: this.assignment
      }
    });
  }

}
