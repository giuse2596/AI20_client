import {Delivery} from '../models/delivery.model';
import {Assignment} from '../models/assignment.model';
import {Homework} from '../models/homework.model';

export class DialogData{
  courseName: string;
  proposer: string;
  members: string[];
  delivery: Delivery;
  assignment: Assignment;
  homework: Homework;
  studentId: string;
  error: string;
}
