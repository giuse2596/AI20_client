import { Component, OnInit } from '@angular/core';
import {CourseService} from "../../services/course.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, of} from "rxjs";
import {Group} from "../../models/group.model";
import {VmImage} from "../../models/vmImage.model";
import {MatDialog} from "@angular/material/dialog";
import {EditTeamResourcesDialogComponent} from "./edit-team-resources-dialog.component";
import {Course} from "../../models/course.model";

@Component({
  selector: 'app-vms-cont',
  templateUrl: './vms-cont.component.html',
  styleUrls: ['./vms-cont.component.css']
})
export class VmsContComponent implements OnInit {

  courseId: string;
  teams$: Observable<Group[]>;
  courseSelected$: Observable<Course>;
  error: string;

  constructor(
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.courseId = this.route.snapshot.params.courseId;
    this.courseSelected$ = this.courseService.find(this.courseId);
    this.courseService.getAllEnabledTeams(this.courseId).subscribe(
      teams => {
          for(let team of teams){
            this.courseService.getAllTeamVms(this.courseId, team.id).subscribe(
              vms => {
                team.vmList = vms;
              }
            )

            this.courseService.getTeamRemainingResource(this.courseId, team.id).subscribe(
              value => {
                team.resourceAvailable = value;
              }
            )
          }

          this.teams$ = of(teams);
      }
    );

  }

  connectVm(vm: VmImage){
    this.courseService.connectVm(this.courseId, vm.teamId, vm.id).subscribe(
      value => {
        this.error = '';
        console.log(window.URL.createObjectURL(value));
        window.open(window.URL.createObjectURL(value), "_blank");
      },

      error => {
        if (error.error.status === 409){
          this.error = error.error.message;
        }
      }
    );
  }

  editResources(team: Group){
    this.dialog.open(EditTeamResourcesDialogComponent, {
      data: {
        group: team
      }
    }).afterClosed().subscribe(
      value => {
        if (value){
          if(value.result === true){
            this.courseService.editTeamLimits(this.courseId, team.id, value.group).subscribe(
              ok => {
                this.courseService.getAllEnabledTeams(this.courseId).subscribe(
                  teams => {
                    for(let team of teams){
                      this.courseService.getAllTeamVms(this.courseId, team.id).subscribe(
                        vms => {
                          team.vmList = vms;
                        }
                      )

                      this.courseService.getTeamRemainingResource(this.courseId, team.id).subscribe(
                        value => {
                          team.resourceAvailable = value;
                        }
                      )
                    }

                    this.teams$ = of(teams);
                  }
                );
              }
            );

          }
        }
      }
    )
  }


}
