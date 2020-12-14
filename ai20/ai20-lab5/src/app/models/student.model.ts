export class Student{
    id: string;
    name: string;
    firstName: string;
    courses: string[];
    groups: string[];

    constructor(id: string, name: string, firstName: string, courses: string[], groups: string[]){
        this.id = id;
        this.name = name;
        this.firstName = firstName;
        this.courses = courses;
        this.groups = groups;
    }
}
