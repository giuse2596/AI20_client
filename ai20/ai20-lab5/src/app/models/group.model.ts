import {VmImage} from "./vmImage.model";

export class Group{
  id: string;
  name: string;
  proposer: string;
  active: boolean;
  requestAccepted: Map<string, boolean>;
  cpuMax: number;
  ramMax: number;
  diskSpaceMax: number;
  totVM: number;
  activeVM: number;
  vmList: VmImage[];
  resourceAvailable;


  constructor(id: string, name: string, proposer: string, active: boolean){
    this.id = id;
    this.name = name;
    this.proposer = proposer;
    this.active = active;
  }
}
