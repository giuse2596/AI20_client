import {Assignment} from '../assignment.model';
import {Delivery} from '../delivery.model';
import {Homework} from '../homework.model';

export class DialogData{
  delivery: Delivery;
  assignment: Assignment;
  homework: Homework;
  courseName: string;
}
