export class Group{
  id: string;
  name: string;
  proposer: string;
  active: boolean;
  timeoutMillis: number;
  requestAccepted: Map<string, boolean>;

  constructor(id: string, name: string, proposer: string, active: boolean, timeoutMillis: number){
    this.id = id;
    this.name = name;
    this.proposer = proposer;
    this.active = active;
    this.timeoutMillis = timeoutMillis;
  }
}
