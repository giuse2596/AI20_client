import { Component, OnInit, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Student } from '../student.model';
import { MatTableDataSource } from '@angular/material/table';



enum State{
  NOT_CHECKED,
  INTERMEDIATE,
  CHECKED
}

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {


  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort, {static: true}) sort: MatSort;


  displayColumns: string[] = ['Select', 'id', 'name', 'firstName'];

  @Input() studentsInTable: Student[];

//  @Input() students: Student[];
  students: Student[];
  @Input()
  set allStudents(students: Student[]) {
    this.students = [... students];
    this.options = [...this.students];
  }

  masterState: State = State.NOT_CHECKED;

  dataSource: MatTableDataSource<Student> = new MatTableDataSource();

  studentSelected: Student[] = [
  ];

  options: Student[] = [];

  optionSelected: Student;

  @Output()
  private enrollEmitter = new EventEmitter<Student[]>();

  @Output()
  private deleteEmitter = new EventEmitter<Student[]>();

  constructor() {
    this.options = this.students;
   }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.studentsInTable);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }


  getChangeEvent(event, row){
    if (row === 'master'){
      switch (this.masterState){
        case State.NOT_CHECKED:
          this.masterState = State.CHECKED;
          this.studentsInTable.forEach(s => this.studentSelected.push(s));
          break;
        case State.INTERMEDIATE:
          this.masterState = State.CHECKED;
          this.studentsInTable.forEach(s => this.studentSelected.push(s));
          break;
        case State.CHECKED:
          this.masterState = State.NOT_CHECKED;
          this.studentSelected = [];
          break;
      }
    }else{
      if (!this.studentSelected.some(s => s.id === row.id ) && event.checked === true ){
        console.log('entrato');
        this.studentSelected.push(row);
        if (this.studentSelected.length === this.studentsInTable.length){
          this.masterState = State.CHECKED;
        }else{
          this.masterState = State.INTERMEDIATE;
        }
      }else if (this.studentSelected.some(s => s.id === row.id ) && event.checked === false){
        const index = this.studentSelected.indexOf(row);
        this.studentSelected.splice(index, 1);
        if(this.studentSelected.length === 0){
          this.masterState = State.NOT_CHECKED;
        }else{
          this.masterState = State.INTERMEDIATE;
        }
      }
    }
}

  isChecked(row){
    if (row === 'master'){
      return this.masterState === State.CHECKED;
    }
    if (this.studentSelected.some(s => s.id === row.id)){
      return true;
    }

    return false;
  }

  isIntermediate(){
    return this.masterState === State.INTERMEDIATE;
  }

  delete(){
    // this.studentSelected.forEach(s => this.studentsInTable.splice(this.studentsInTable.indexOf(s), 1));
    if (this.studentSelected != null && this.studentSelected.length !== 0){
      console.log(this.studentSelected);
      this.deleteEmitter.emit(this.studentSelected);
      this.studentSelected = [];
      /*
      this.dataSource = new MatTableDataSource(this.studentsInTable);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      */
      this.masterState = State.NOT_CHECKED;
    }
  }

  displayFn(student: Student): string{
    return  student.name + ' '
    + student.firstName + ' (' + student.id + ')';
  }

  filter(name){
    console.log(name);
    const lowerCase = name.toLowerCase();
    this.options = this.students.filter(s => s.name.toLowerCase().indexOf(lowerCase) === 0);
  }

  save(option: Student){
    console.log(option);
    this.optionSelected = option;
  }

  insert(){
    /*
    if (!this.studentsInTable.some(s => s.id === this.optionSelected.id) && this.optionSelected != null){
      // this.studentsInTable.push(this.optionSelected);
    }

    */
   if (this.optionSelected != null){
    const toAdd: Student[] = [];
    toAdd.push(this.optionSelected);
    this.enrollEmitter.emit(toAdd);
    /*
    this.dataSource = new MatTableDataSource(this.studentsInTable);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    */
  }
 }

  @Input() set enrolledStudents(enrolledStudents: Student[]){
    if (enrolledStudents !== null){
      this.studentsInTable = Array.from(enrolledStudents);
      this.dataSource = new MatTableDataSource(this.studentsInTable);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
  }

}
