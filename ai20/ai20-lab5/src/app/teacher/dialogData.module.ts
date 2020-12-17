import {Assignment} from '../models/assignment.model';
import {Delivery} from '../models/delivery.model';
import {Homework} from '../homework.model';

export class DialogData{
  delivery: Delivery;
  assignment: Assignment;
  homework: Homework;
  courseName: string;
  error: string;
}
