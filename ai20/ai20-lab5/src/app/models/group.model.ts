export class Group{
  id: string;
  name: string;
  proposer: string;
  active: boolean;
  requestAccepted: Map<string, boolean>;

  constructor(id: string, name: string, proposer: string, active: boolean){
    this.id = id;
    this.name = name;
    this.proposer = proposer;
    this.active = active;
  }
}
