export class Course{
    name: string;
    acronym: string;
    students: string[];
    active: boolean;
    min: number;
    max: number;

    constructor(name: string, acronym: string, students: string[], active: boolean, min: number, max: number){
      this.name = name;
      this.acronym = acronym;
      this.active = active;
      this.min = min;
      this.max = max;
    }
}
