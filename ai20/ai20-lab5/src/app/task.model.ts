export class Task{
  assignmentId: string;
  content: string;
  studentId: string;
  studentFirstName: string;
  studentName: string;
  timestamp: Date;
  state: string;

  constructor(assignmentId: string, content: string, studentId: string, timestamp: Date, state: string){
    this.assignmentId = assignmentId;
    this.content = content;
    this.studentId = studentId;
    this.timestamp = timestamp;
    this.state = state;
  }
}
