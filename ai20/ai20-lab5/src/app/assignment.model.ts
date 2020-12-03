export class Assignment{
  id: string;
  content: string;
  courseId: string;
  releaseDate: Date;
  expiryDate: Date;

  constructor(id: string, content: string, courseId: string, releaseDate: Date, expiryDate: Date){
    this.id = id;
    this.content = content;
    this.courseId = courseId;
    this.releaseDate = releaseDate;
    this.expiryDate = expiryDate;
  }
}
