export class Delivery {
  id: string;
  pathImage: string;
  timestamp: Date;
  status: string;
  studentId: string;
  studentFirstName: string;
  studentName: string;

  constructor(id: string, content: string, timestamp: Date, status: string){
    this.id = id;
    this.pathImage = content;
    this.timestamp = timestamp;
    this.status = status;
  }
}
