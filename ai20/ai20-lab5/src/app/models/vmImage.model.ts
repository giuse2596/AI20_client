import {Student} from "./student.model";

export class VmImage{

   id: number;
   name: string;
   cpu: number;
   ram: number;
   diskSpace: number;
   active: boolean;
   teamId: string;
   creator: string;
   owners: Student[];

  constructor(id: number = 0,name: string, cpu: number, ram: number, disk: number) {
    this.id = id;
    this.name = name;
    this.cpu = cpu;
    this.ram = ram;
    this.diskSpace = disk;
    this.active = false;
  }

}
