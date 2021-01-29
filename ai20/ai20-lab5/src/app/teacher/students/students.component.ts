import { Component, OnInit, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Student } from '../../models/student.model';
import { MatTableDataSource } from '@angular/material/table';
import {Course} from '../../models/course.model';



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


  tooltipText: string = 'Caricare csv con intestazione: id, firstName, name, email';

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort, {static: true}) sort: MatSort;


  displayColumns: string[] = ['Select', 'id', 'name', 'firstName'];

  @Input() studentsInTable: Student[];

  @Input() selected: Course;

  students: Student[];
  @Input()
  set allStudents(students: Student[]) {
    if (students !== null) {
      this.students = [... students];
      this.options = [... this.students];
    }
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

  @Output()
  private uploadCsvEmitter = new EventEmitter<File>();

  constructor() {
    this.options = this.students;
   }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.studentsInTable);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }


  getChangeEvent(event, row) {
    let pageSize;
    if (this.paginator.pageIndex === this.paginator.getNumberOfPages() - 1) {
      pageSize = this.paginator.length - this.paginator.pageSize * this.paginator.pageIndex;
    } else {
      pageSize = this.paginator.pageSize;
    }
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const endIndex = startIndex + pageSize;
    if (row === 'master') {
      switch (this.masterState) {
        case State.NOT_CHECKED:
          this.masterState = State.CHECKED;
          for (let index = startIndex; index < endIndex; index++) {
            this.studentSelected.push(this.dataSource.sortData(this.studentsInTable, this.sort)[index]);
            // mantengo l'ordinamento con matSort
          }
          break;
        case State.INTERMEDIATE:
          this.masterState = State.CHECKED;
          for (let index = startIndex; index < endIndex; index++) {
            if (this.studentSelected.indexOf(this.dataSource.sortData(this.studentsInTable, this.sort)[index]) < 0) {
              this.studentSelected.push(this.dataSource.sortData(this.studentsInTable, this.sort)[index]);
              // mantengo l'ordinamento con matSort
            }
          }
          break;
        case State.CHECKED:
          this.masterState = State.NOT_CHECKED;
          for (let index = startIndex; index < endIndex; index++) {
            this.studentSelected.splice(this.studentSelected.indexOf(this.dataSource.sortData(this.studentsInTable, this.sort)[index]), 1);
          }
          break;
      }
    } else {
      if (!this.studentSelected.some(s => s.id === row.id) && event.checked === true) {
        this.studentSelected.push(row);
        this.masterCheckboxState();
      } else if (this.studentSelected.some(s => s.id === row.id) && event.checked === false) {
        const index = this.studentSelected.indexOf(row);
        this.studentSelected.splice(index, 1);
        if (this.studentSelected.length === 0) {
          this.masterState = State.NOT_CHECKED;
        } else {
          this.masterState = State.INTERMEDIATE;
        }
      }
    }
  }

  allPagesSelection() {
    switch (this.masterState) {
      case State.NOT_CHECKED:
        this.masterState = State.CHECKED;
        this.studentSelected = []; // per evitare duplicati
        this.studentsInTable.forEach(s => this.studentSelected.push(s));
        break;
      case State.INTERMEDIATE:
        this.masterState = State.CHECKED;
        this.studentSelected = []; // per evitare duplicati
        this.studentsInTable.forEach(s => this.studentSelected.push(s));
        break;
      case State.CHECKED:
        this.masterState = State.NOT_CHECKED;
        this.studentSelected = [];
        break;
    }
  }

  masterCheckboxState() {
    let pageSize;
    if (this.paginator.pageIndex === this.paginator.getNumberOfPages() - 1) {
      pageSize = this.paginator.length - this.paginator.pageSize * this.paginator.pageIndex;
    } else {
      pageSize = this.paginator.pageSize;
    }
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const endIndex = startIndex + pageSize;
    let countSelected = 0;
    for (let index = startIndex; index < endIndex; index++) { // conto quanti sono selezionati
      if (this.studentSelected.indexOf(this.dataSource.sortData(this.studentsInTable, this.sort)[index]) >= 0) {
        countSelected++;
      }
    }
    if (countSelected === 0) { // nessuno selezionato
      this.masterState = State.NOT_CHECKED;
    }
    if (countSelected === pageSize) { // tutti selezionati
      this.masterState = State.CHECKED;
    }
    if (countSelected > 0 && countSelected < pageSize) { // alcuni selezionati
      this.masterState = State.INTERMEDIATE;
    }
  }


  isChecked(row){
    if (row === 'master'){
      return this.masterState === State.CHECKED;
    }
    return this.studentSelected.some(s => s.id === row.id);
  }

  isIntermediate(){
    return this.masterState === State.INTERMEDIATE;
  }

  delete(){
    // this.studentSelected.forEach(s => this.studentsInTable.splice(this.studentsInTable.indexOf(s), 1));
    if (this.studentSelected != null && this.studentSelected.length !== 0){
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
    const lowerCase = name.toLowerCase();
    this.options = this.students.filter(s => s.name.toLowerCase().indexOf(lowerCase) === 0);
  }

  save(option: Student){
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

 addMany(csvFile: File){
    this.uploadCsvEmitter.emit(csvFile);
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
