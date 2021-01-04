import { Component, OnInit } from '@angular/core';
import {CourseService} from "../services/course.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {Group} from "../models/group.model";

@Component({
  selector: 'app-vms-cont',
  templateUrl: './vms-cont.component.html',
  styleUrls: ['./vms-cont.component.css']
})
export class VmsContComponent implements OnInit {

  courseId: string;
  teams$: Observable<Group[]>;

  constructor(
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.courseId = this.route.snapshot.params.courseId;
    this.teams$ = this.courseService.getAllEnabledTeams(this.courseId);

    this.router.events.subscribe(
      value => {
        this.courseId = this.route.snapshot.params.courseId;
        this.teams$ = this.courseService.getAllEnabledTeams(this.courseId);
      }
    )
  }

}
