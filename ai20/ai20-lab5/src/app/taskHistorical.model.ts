export class TaskHistorical{
  content: string;
  timestamp: Date;
  state: string;

  constructor(content: string, timestamp: Date, state: string){
    this.content = content;
    this.timestamp = timestamp;
    this.state = state;
  }
}
