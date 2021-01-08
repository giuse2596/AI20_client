export class Group{
  id: string;
  name: string;
  proposer: string;
  active: boolean;
  requestAccepted: Map<string, boolean>;
  cpuMAx: number;
  ramMax: number;
  diskSpaceMax: number;
  totVm: number;
  activeVM: number;


  constructor(id: string, name: string, proposer: string, active: boolean){
    this.id = id;
    this.name = name;
    this.proposer = proposer;
    this.active = active;
  }
}
