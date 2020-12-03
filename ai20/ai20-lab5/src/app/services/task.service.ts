import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Assignment} from '../assignment.model';
import {Observable} from 'rxjs';
import {Task} from '../task.model';
import {TaskHistorical} from '../taskHistorical.model';

const hostname = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  getTasksForAssignment(assignment: Assignment): Observable<Task[]> {
    return this.http.get<Task[]>('url');
  }

  updateTask(task: Task) {
    this.http.put<Task>('url', task);
  }

  getHistoricalsForTask(task: Task): Observable<TaskHistorical[]> {
    return this.http.get<TaskHistorical[]>('url');
  }
}
