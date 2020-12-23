export class Course{
    id: string;
    name: string;
    acronym: string;
    students: string[];
    enabled: boolean;
    min: number;
    max: number;

    url: string;

    constructor(id: string, name: string, acronym: string, students: string[], active: boolean, min: number, max: number){
      this.id = id;
      this.name = name;
      this.acronym = acronym;
      this.enabled = active;
      this.min = min;
      this.max = max;
    }

}
