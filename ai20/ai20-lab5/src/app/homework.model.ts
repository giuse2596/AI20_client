export class Homework {
  id: string;
  mark: number;
  evaluation: string;

  constructor(id: string, mark: number, evaluation: string){
    this.id = id;
    this.mark = mark;
    this.evaluation = evaluation;
  }
}
