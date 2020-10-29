export class Group{
    id: string;
    name: string;
    course: string;
    members: string[];

    constructor(id: string, name: string, course: string, members: string[]){
      this.id = id;
      this.name = name;
      this.course = course;
      this.members = members;
    }
}
