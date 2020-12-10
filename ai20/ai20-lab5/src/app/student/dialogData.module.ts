import {Delivery} from '../delivery.model';
import {Assignment} from '../assignment.model';
import {Homework} from '../homework.model';

export class DialogData{
  notInRange: boolean;
  min: number;
  max: number;
  course: string;
  proposer: string;
  members: string[];
  delivery: Delivery;
  assignment: Assignment;
  homework: Homework;
  courseName: string;
}
