export class Assignment{
  id: string;
  name: string;
  pathImage: string;
  releaseDate: Date;
  expiryDate: Date;

  constructor(id: string, name: string, pathImage: string, releaseDate: Date, expiryDate: Date){
    this.id = id;
    this.name = name;
    this.pathImage = pathImage;
    this.releaseDate = releaseDate;
    this.expiryDate = expiryDate;
  }
}
