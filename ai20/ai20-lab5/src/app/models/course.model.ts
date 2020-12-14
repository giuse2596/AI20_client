export class Course{
    id: string;
    name: string;
    acronym: string;
    students: string[];
    active: boolean;
    min: number;
    max: number;

    constructor(id: string, name: string, acronym: string, students: string[], active: boolean, min: number, max: number){
      this.id = id;
      this.name = name;
      this.acronym = acronym;
      this.active = active;
      this.min = min;
      this.max = max;
    }
}
