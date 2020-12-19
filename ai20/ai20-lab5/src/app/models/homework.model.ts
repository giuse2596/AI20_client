export class Homework {
  id: string;
  mark: number;
  editable: boolean;

  constructor(id: string, mark: number, editable: boolean){
    this.id = id;
    this.mark = mark;
    this.editable = editable;
  }
}
