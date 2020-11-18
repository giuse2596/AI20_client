export class Group{
  id: string;
  name: string;
  course: string;
  members: string[];
  activated: boolean;

  constructor(id: string, name: string, course: string, members: string[], activated: boolean){
    this.id = id;
    this.name = name;
    this.course = course;
    this.members = members;
    this.activated = activated;
  }
}
