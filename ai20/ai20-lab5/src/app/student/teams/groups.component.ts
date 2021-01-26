import {Component, Input, OnInit} from '@angular/core';
import {Student} from '../../models/student.model';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {GroupNameDialogComponent} from './group-name-dialog.component';
import {Course} from '../../models/course.model';
import {StudentService} from '../../services/student.service';
import {Group} from '../../models/group.model';
import {MessageService} from '../../services/message.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  displayColumnsMembers: string[] = ['id', 'name', 'firstName'];
  displayColumnsAvailables: string[] = ['Select', 'id', 'name', 'firstName'];
  displayColumnsPendingGroups: string[] = ['id', 'name', 'firstName', 'accepted'];
  dataSourceMembers: MatTableDataSource<Student> = new MatTableDataSource();
  dataSourceAvailables: MatTableDataSource<Student> = new MatTableDataSource();
  dataSourceMembersOfPendingGroups = new Map<string, MatTableDataSource<Student>>();
  membersSelected: Student[] = [];
  pendingGroupsList: Group[];
  @Input()
  set pendingGroupsListInput(pendingGroupsList: Group[]) {
    if (pendingGroupsList !== null) {
      this.pendingGroupsList = pendingGroupsList;
      this.dataSourceAvailables = new MatTableDataSource(this.availables);
      for (const group of this.pendingGroupsList) {
        group.requestAccepted = new Map<string, boolean>();
        this.studentService.getGroupMembers(this.courseName, group.id)
          .subscribe(allMembers => {
            this.dataSourceMembersOfPendingGroups.set(group.name, new MatTableDataSource(allMembers));
            this.studentService.getMembersWhoAccepted(this.student.id, group.id)
              .subscribe(confirmedMembers => {
                for (const member of confirmedMembers) {
                  group.requestAccepted.set(member.id, true);
                  allMembers.splice(allMembers.map(s => s.id).indexOf(member.id), 1); // a fine loop rimangono solo false
                }
                for (const member of allMembers) {
                  group.requestAccepted.set(member.id, false);
                }
              });
          });
      }
    }
  }
  groupMembers: Student[];
  @Input()
  set groupMembersInput(groupMembers: Student[]) {
    if (groupMembers !== null) {
      this.groupMembers = groupMembers;
      this.dataSourceMembers = new MatTableDataSource(this.groupMembers);
    }
  }
  @Input() group: Group;
  @Input() student: Student;
  @Input() availables: Student[];
  @Input() course: Course;
  @Input() courseName: string;
  @Input() studentAvailable: boolean;

  constructor(public dialog: MatDialog,
              private studentService: StudentService,
              private messageService: MessageService) { }

  ngOnInit(): void {
  }

  getChangeEvent(event, row){
    if (!this.membersSelected.some(s => s.id === row.id ) && event.checked === true ){
      this.membersSelected.push(row);
    }else if (this.membersSelected.some(s => s.id === row.id ) && event.checked === false){
      const index = this.membersSelected.indexOf(row);
      this.membersSelected.splice(index, 1);
    }
  }

  isChecked(row){
    return this.membersSelected.some(s => s.id === row.id);
  }

  setGroupNameAndTimeout() {
    if (!this.membersSelected.map(s => s.id).includes(this.student.id)) {
      this.membersSelected.push(this.student);
    }
    if (this.membersSelected.length >= this.course.min && this.membersSelected.length <= this.course.max) {
      this.openDialog();
    } else {
      this.messageService.printMessage(false, `Il numero di membri deve essere compreso tra ${this.course.min} e ${this.course.max}`);
    }
  }

  private openDialog(errorMessage ?: string) {
    const dialogRef = this.dialog.open(GroupNameDialogComponent, {data: {
        courseName: this.course.name,
        proposer: this.student.id,
        members: this.membersSelected.map(s => s.id),
        error: errorMessage
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.err) {
        this.openDialog(result.err);
      }
      if (result && result.success) {
        this.messageService.printMessage(true, 'Richiesta creata con successo');
      }
    });
  }
}
