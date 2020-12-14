export class Delivery {
  id: string;
  content: string;
  timestamp: Date;
  state: string;
  studentId: string;
  studentFirstName: string;
  studentName: string;

  constructor(id: string, content: string, timestamp: Date, state: string){
    this.id = id;
    this.content = content;
    this.timestamp = timestamp;
    this.state = state;
  }
}
