import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {Group} from '../../models/group.model';
import {CourseService} from '../../services/course.service';
import {AuthService} from '../../auth/auth.service';
import {StudentService} from '../../services/student.service';
import {Student} from '../../models/student.model';
import {Course} from '../../models/course.model';

@Component({
  selector: 'app-groups-cont',
  templateUrl: './groups-cont.component.html',
  styleUrls: ['./groups-cont.component.css']
})
export class GroupsContComponent implements OnInit {
  student$: Observable<Student>;
  course$: Observable<Course>;
  courseId: string;
  studentAvailable = false;
  availables: Student[];
  pendingGroups$: Observable<Group[]>;
  group: Group;
  groupMembers$: Observable<Student[]>;

  constructor(private studentService: StudentService,
              private route: ActivatedRoute,
              private courseService: CourseService,
              private authService: AuthService) { }

  ngOnInit(): void {
    const studentId = this.authService.user.username;
    this.courseId = this.route.snapshot.params.courseId;
    this.student$ = this.studentService.find(studentId);
    this.course$ = this.courseService.find(this.courseId);
    this.courseService.getAvailablesForCourse(this.courseId)
      .subscribe(availables => {
        if (availables.map(s => s.id).includes(studentId)) {
          this.studentAvailable = true;
          availables.splice(availables.map(s => s.id).indexOf(studentId), 1); // non includo lo studente nell'elenco
          this.availables = availables;
          this.pendingGroups$ = this.studentService.getPendingGroupsForCourse(this.courseId);
        } else {
          this.studentService.getGroupForCourse(studentId, this.courseId)
            .subscribe(groups => {
              if (groups[0].active) {
                this.group = groups[0]; // ce n'è solo uno
                this.groupMembers$ = this.studentService.getGroupMembers(this.courseId, this.group.id);
              } else {
                this.studentAvailable = true;
              }
            });
        }
      });
  }

}
