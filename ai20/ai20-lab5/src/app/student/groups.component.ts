import {Component, Input, OnInit} from '@angular/core';
import {Request} from '../models/request.model';
import {Student} from '../models/student.model';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {GroupNameDialogComponent} from './group-name-dialog.component';
import {Course} from '../models/course.model';
import {StudentService} from '../services/student.service';
import {CourseService} from '../services/course.service';
import {Group} from '../models/group.model';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  requestsList: Request[];
  displayColumnsMembers: string[] = ['id', 'name', 'firstName'];
  displayColumnsAvailables: string[] = ['Select', 'id', 'name', 'firstName'];
  displayColumnsRequests: string[] = ['id', 'name', 'firstName', 'accepted'];
  dataSourceMembers: MatTableDataSource<Student> = new MatTableDataSource();
  dataSourceAvailables: MatTableDataSource<Student> = new MatTableDataSource();
  dataSourceRequests = new Map<string, MatTableDataSource<Student>>();
  membersSelected: Student[] = [];
  studentInActivatedGroup: boolean;
  studentInPendingGroup: boolean;
  group: Group;
  @Input() student: Student;
  @Input() course: Course;

  constructor(public dialog: MatDialog, private studentService: StudentService, private courseService: CourseService) { }

  ngOnInit(): void {
    this.courseService.getAvailablesForCourse(this.course.name)
      .subscribe(availables => {
          if (availables.includes(this.student)) {
            this.studentInActivatedGroup = false;
            this.studentInPendingGroup = false;
            availables.splice(availables.indexOf(this.student), 1); // non includo lo studente nell'elenco
            this.dataSourceAvailables = new MatTableDataSource(availables);
            this.studentService.getPendingGroupsForCourse(this.course.name)
              .subscribe(requests => {
                  this.requestsList = requests;
                  for (const request of requests) {
                    this.studentService.getRequestMembers(request)
                      .subscribe(members => this.dataSourceRequests.set(request.nameGroup, new MatTableDataSource(members)));
                  }
                }
              );
          } else {
            this.studentService.getGroupForCourse(this.student.id, this.course.name)
              .subscribe(group => {
                if (group.activated) {
                  this.studentInActivatedGroup = true;
                  this.group = group;
                  this.studentService.getGroupMembers(group.id)
                    .subscribe(members => this.dataSourceMembers = new MatTableDataSource(members));
                } else {
                  this.studentInActivatedGroup = false;
                  this.studentInPendingGroup = true;
                }
              });
          }
        }
      );
    /*    if (this.student.courseGroup.has(this.course.name)) {
        this.studentService.getGroupMembers(this.student.courseGroup.get(this.course.name))
        .subscribe(members => this.dataSourceMembers = new MatTableDataSource(members));
      } else {
        this.courseService.getAvailablesForCourse(this.course.name)
        .subscribe(availables => this.dataSourceAvailables = new MatTableDataSource(availables));
        this.studentService.getPendingGroupsForCourse(this.course.name)
        .subscribe(requests =>
        {
          this.requestsList = requests;
          for (const request of requests) {
          this.studentService.getRequestMembers(request)
            .subscribe(members => this.dataSourceRequests.set(request.nameGroup, new MatTableDataSource(members)));
          }
        });
      }*/
  }

  /*  @Input() set members(members: Student[]){
    if (members !== null){
      this.membersList = Array.from(members);
      this.dataSourceMembers = new MatTableDataSource(this.membersList);
    }
    }

    @Input() set availables(availables: Student[]){
    if (availables !== null){
      this.membersList = Array.from(availables);
      this.dataSourceAvailables = new MatTableDataSource(this.availablesList);
    }
    }

    @Input() set requests(requests: Request[]){
    if (requests !== null){
      this.requestsList = Array.from(requests);
      for (const request of this.requestsList) {
      this.studentService.getRequestMembers(request)
        .subscribe(members => this.dataSourceRequests.set(request.nameGroup, new MatTableDataSource(members)));
      }
    }
    }
  */

  getChangeEvent(event, row){
    if (!this.membersSelected.some(s => s.id === row.id ) && event.checked === true ){
      this.membersSelected.push(row);
    }else if (this.membersSelected.some(s => s.id === row.id ) && event.checked === false){
      const index = this.membersSelected.indexOf(row);
      this.membersSelected.splice(index, 1);
    }
  }

  isChecked(row){
    if (this.membersSelected.some(s => s.id === row.id)){
      return true;
    }

    return false;
  }

  setGroupNameAndTimeout() {
    this.membersSelected.push(this.student);
    if (this.membersSelected.length >= this.course.min && this.membersSelected.length <= this.course.max) {
      this.openDialog(false);
    } else {
      this.openDialog(true);
    }
  }

  private openDialog(outOfRange: boolean) {
    this.dialog.open(GroupNameDialogComponent, {data: {
        notInRange: outOfRange,
        min: this.course.min,
        max: this.course.max,
        courseName: this.course.name,
        proposer: this.student.id,
        members: this.membersSelected.map(s => s.id)
      }
    });
  }
}
