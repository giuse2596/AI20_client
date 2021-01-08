import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CreateVmDialogComponent} from "./create-vm-dialog.component";
import {from, Observable, of} from "rxjs";
import {VmImage} from "../models/vmImage.model";
import {StudentService} from "../services/student.service";
import {CourseService} from "../services/course.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../auth/auth.service";
import {Group} from "../models/group.model";
import {every, map, mapTo, mergeMap, toArray} from "rxjs/operators";
import {Student} from "../models/student.model";
import {EditVmDialogComponent} from "./edit-vm-dialog.component";
import {dashCaseToCamelCase} from "@angular/compiler/src/util";

@Component({
  selector: 'app-student-vms-cont',
  templateUrl: './student-vms-cont.component.html',
  styleUrls: ['./student-vms-cont.component.css']
})
export class StudentVmsContComponent implements OnInit {

  constructor(private createVmDialog: MatDialog,
              private studentService: StudentService,
              private courseService: CourseService,
              private authService: AuthService,
              private route: ActivatedRoute) { }

  allVms$: Observable<VmImage[]>;
  courseId: string;
  studentId: string;
  groupId: string = '';
  team$: Observable<Group[]>;
  error: string = '';
  active: boolean;
  availableResources;
  group: Group;
  members: Student[];

  ngOnInit(): void {
    this.courseId = this.route.snapshot.params.courseId;
    this.studentId = this.authService.user.username;
    this.team$ = this.studentService.getGroupForCourse(this.studentId,this.courseId);
    this.team$.subscribe(
      value => {
        this.error = '';
        if(value.length !== 0){
          this.active = true;
          console.log(value[0]);
          this.groupId = value[0].id;
          this.group = value[0];
          this.courseService.getAllTeamVms(this.courseId, value[0].id).subscribe(
            vms => {
              for (let v of vms){
                 this.courseService.getVmOwner(this.courseId, this.groupId, v.id).subscribe(
                   students => {
                     v.owners = students;
                   }
                 )
              }
              console.log(vms);
              this.allVms$ = of(vms);
            }
          );
          this.studentService.getGroupMembers(this.courseId, this.groupId).subscribe(
            students => {
              this.members = students;
            }
          )
          this.courseService.getTeamRemainingResource(this.courseId, this.groupId).subscribe(
            value1 => {
              this.availableResources = value1;
              console.log(this.availableResources);
            }
          );

        }else {
          this.active = false;
        }
      },

      error => {
        if (error.error.status === 409){
          this.error = error.error.message;
        }
      }

    );
  }

  openDialog(){

    this.createVmDialog.open(CreateVmDialogComponent, {
      data: {
        resourcesAvailable: this.availableResources
      }
    }).afterClosed().subscribe(
      val => {
          this.error = '';
          console.log(val);
          if(val) {
            if (val.result === true && this.checkResources(val.data)) {
              this.studentService.createVm(this.studentId, this.groupId, val.data).subscribe(
                value => {
                  this.courseService.getAllTeamVms(this.courseId, this.groupId).subscribe(
                    vms => {
                      for (let v of vms) {
                        this.courseService.getVmOwner(this.courseId, this.groupId, v.id).subscribe(
                          students => {
                            v.owners = students;
                          }
                        )
                      }
                      console.log(vms);
                      this.allVms$ = of(vms);
                    });
                  this.availableResources.cpu -= val.data.cpu;
                  this.availableResources.ram -= val.data.ram;
                  this.availableResources.diskSpace -= val.data.diskSpace;
                },
                error1 => {
                  this.error = error1.error.message;
                }
              );
            } else if (val.result === true) {
              this.error = 'Impossibile creare la vm. Alcune delle specifiche superano i limiti del gruppo';
            }

          }


      },

      error => {
        if (error.error.status === 409){
          this.error = error.error.message;
        }
      }
    );
  }

  checkResources(vm: VmImage): boolean{
    if(this.availableResources.totVM === this.group.totVM)
      return false;

    return this.availableResources.cpu >= vm.cpu
      && this.availableResources.diskSpace >= vm.diskSpace
      && this.availableResources.ram >= vm.ram;
  }

  connectVm(vm: VmImage){
    this.courseService.connectVm(this.courseId, this.groupId, vm.id).subscribe(
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


  startVm(vm: VmImage){
    this.studentService.startVm(this.studentId, this.groupId, vm.id).subscribe(
      value => {
        this.error = '';
        this.courseService.getAllTeamVms(this.courseId, this.groupId).subscribe(
          vms => {
            for (let v of vms) {
              this.courseService.getVmOwner(this.courseId, this.groupId, v.id).subscribe(
                students => {
                  v.owners = students;
                }
              )
            }
            console.log(vms);
            this.allVms$ = of(vms);
          });
      },

      error => {
        if (error.error.status === 409){
          this.error = error.error.message;
        }
      }
    );
  }

  stopVm(vm: VmImage){
    this.studentService.stopVm(this.studentId, this.groupId, vm.id).subscribe(
      value => {
        this.error = '';
        this.courseService.getAllTeamVms(this.courseId, this.groupId).subscribe(
          vms => {
            for (let v of vms) {
              this.courseService.getVmOwner(this.courseId, this.groupId, v.id).subscribe(
                students => {
                  v.owners = students;
                }
              )
            }
            console.log(vms);
            this.allVms$ = of(vms);
          });
      },

      error => {
        if (error.error.status === 409){
          this.error = error.error.message;
        }
      }
    );
  }

  delete(vm: VmImage){
    this.studentService.deleteVm(this.studentId, this.groupId, vm.id).subscribe(
      value => {
        this.courseService.getAllTeamVms(this.courseId, this.groupId).subscribe(
          vms => {
            for (let v of vms) {
              this.courseService.getVmOwner(this.courseId, this.groupId, v.id).subscribe(
                students => {
                  v.owners = students;
                }
              )
            }
            console.log(vms);
            this.allVms$ = of(vms);
          });
        this.availableResources.cpu += vm.cpu;
        this.availableResources.ram += vm.ram;
        this.availableResources.diskSpace += vm.diskSpace;
        console.log(this.availableResources);
      },
      error => {
        if (error.error.status === 409) {
          this.error = error.error.message;
        }
      }
    );
  }

  openEdit(vm: VmImage){
    this.createVmDialog.open(EditVmDialogComponent, {
      autoFocus: false,
      height: "500px",
      width: "500px",
      data: {
        vm: vm,
        resourcesAvailable: this.availableResources,
        members: this.members
      }
    }).afterClosed().subscribe(
      val => {
        this.error = '';
        console.log(val);
        if(val) {
          if (val.modify === true && val.newResources) {
            console.log("Vecchie risorse: ");
            console.log(this.availableResources);
            this.availableResources = val.newResources;
            console.log("Nuove risorse: ");
            console.log(this.availableResources);
          }
          if (val.modify === true && this.checkResources(val.data)) {
            this.studentService.modifyVm(this.studentId, this.groupId, val.data).subscribe(
              value => {
                this.courseService.getAllTeamVms(this.courseId, this.groupId).subscribe(
                  vms => {
                    for (let v of vms) {
                      this.courseService.getVmOwner(this.courseId, this.groupId, v.id).subscribe(
                        students => {
                          v.owners = students;
                        }
                      )
                    }
                    console.log(vms);
                    this.allVms$ = of(vms);
                  });
                this.availableResources.cpu -= val.data.cpu;
                this.availableResources.ram -= val.data.ram;
                this.availableResources.diskSpace -= val.data.diskSpace;
              },
              error1 => {
                this.error = error1.error.message;
              }
            );
          } else if (val.modify === true) {
            this.error = 'Impossibile apportare le modifiche. Alcune delle specifiche superano i limiti del gruppo';
          } else if (val.giveOwnership === true) {
            console.log(val.owners);
            this.studentService.addOwners(this.studentId, this.groupId, vm.id, val.owners).subscribe(
              value => {
                this.courseService.getAllTeamVms(this.courseId, this.groupId).subscribe(
                  vms => {
                    for (let v of vms) {
                      this.courseService.getVmOwner(this.courseId, this.groupId, v.id).subscribe(
                        students => {
                          v.owners = students;
                        }
                      )
                    }
                    console.log(vms);
                    this.allVms$ = of(vms);
                  });
              },
              error1 => {
                this.error = error1.error.message;
              }
            )
          }
        }
      },

      error => {
        if (error.error.status === 409){
          this.error = error.error.message;
        }
      }
    )
  }

}
