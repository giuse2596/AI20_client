import {Delivery} from '../models/delivery.model';
import {Assignment} from '../models/assignment.model';
import {Homework} from '../homework.model';

export class DialogData{
  notInRange: boolean;
  min: number;
  max: number;
  courseName: string;
  proposer: string;
  members: string[];
  delivery: Delivery;
  assignment: Assignment;
  homework: Homework;
  studentId: string;
}
