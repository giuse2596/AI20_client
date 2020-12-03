import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Task} from '../task.model';
import {Assignment} from '../assignment.model';
import {StudentService} from '../services/student.service';
import {TaskService} from '../services/task.service';
import {MatDialog} from '@angular/material/dialog';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TasksComponent implements OnInit {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayColumnsTasks: string[] =
    ['content', 'studentId', 'studentFirstName', 'studentName', 'timestamp', 'state'];
  selectedState = '';
  dataSourceTasks: MatTableDataSource<Task> = new MatTableDataSource();
  tasks: Task[];
  @Input() assignment: Assignment;
  expandedTask: Task;

  constructor(public dialog: MatDialog,
              private studentService: StudentService,
              private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getTasksForAssignment(this.assignment).subscribe(tasks => {
      this.tasks = tasks;
      for (const task of this.tasks) {
        this.studentService.find(task.studentId).subscribe(student => {
          task.studentFirstName = student.firstName;
          task.studentName = student.name;
        });
      }
      this.dataSourceTasks = new MatTableDataSource(this.tasks);
      this.dataSourceTasks.sort = this.sort;
    });
  }

  filter() {
    this.dataSourceTasks = new MatTableDataSource(this.tasks.filter(task => {
      if (this.selectedState !== '') {
        return task.state === this.selectedState;
      }
      else {
        return true;
      }
    }));
    this.dataSourceTasks.sort = this.sort;
  }
}
