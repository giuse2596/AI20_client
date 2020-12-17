export class VmModel{

  cpuMax: number;
  ramMax: number;
  diskSpaceMax: number;
  totalInstances: number;
  activeInstances: number;

  constructor(cpuMax: number, ramMax: number, diskSpaceMax: number, totalInstances: number, activeInstance: number) {
    this.cpuMax = cpuMax;
    this.ramMax = ramMax;
    this.diskSpaceMax = diskSpaceMax;
    this.totalInstances = totalInstances;
    this.activeInstances = activeInstance;

  }

}
