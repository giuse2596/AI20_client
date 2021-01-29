import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {VmDialog} from "../../models/vmDialog.model";
import {GroupDialogDataModel} from "../../models/groupDialogData.model";
import {Group} from "../../models/group.model";

@Component({
  selector: 'app-edit-team-resources-dialog',
  templateUrl: './edit-team-resources-dialog.component.html',
  styleUrls: ['./edit-team-resources-dialog.component.css']
})
export class EditTeamResourcesDialogComponent implements OnInit {

  teamResourcesForm: FormGroup = this.builder.group({
    maxCpu: [1, [Validators.required, Validators.min(1)]],
    maxRam: [1, [Validators.required, Validators.min(1)]],
    maxDisk: [1, [Validators.required, Validators.min(1)]],
    maxInstances: [1, [Validators.required, Validators.min(1)]],
    activeInstances: [1, [Validators.required, Validators.min(1)]]
  });

  error: string;

  constructor(private builder: FormBuilder,
              private dialogRef: MatDialogRef<EditTeamResourcesDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: GroupDialogDataModel) { }


  ngOnInit(): void {
    this.error = '';
    this.maxCpu.setValue(this.data.group.cpuMax);
    this.maxRam.setValue(this.data.group.ramMax);
    this.maxDisk.setValue(this.data.group.diskSpaceMax);
    this.maxInstances.setValue(this.data.group.totVM);
    this.activeInstances.setValue(this.data.group.activeVM);
  }

  get maxCpu(){
    return this.teamResourcesForm.get('maxCpu');
  }

  get maxRam(){
    return this.teamResourcesForm.get('maxRam');
  }

  get maxDisk(){
    return this.teamResourcesForm.get('maxDisk');
  }

  get maxInstances(){
    return this.teamResourcesForm.get('maxInstances');
  }

  get activeInstances(){
    return this.teamResourcesForm.get('activeInstances');
  }

  onNoClick(){
    this.dialogRef.close(false);
  }

  edit(){
    if(this.checkResources()) {
      this.error = '';
      const modifiedTeam: Group = new Group(this.data.group.id, this.data.group.name, this.data.group.proposer, this.data.group.active);
      modifiedTeam.cpuMax = this.maxCpu.value;
      modifiedTeam.ramMax = this.maxRam.value;
      modifiedTeam.diskSpaceMax = this.maxDisk.value;
      modifiedTeam.totVM = this.maxInstances.value;
      modifiedTeam.activeVM = this.activeInstances.value;
      this.dialogRef.close({
        result: true, group: modifiedTeam
      });
    }else {
      this.error = 'Questa configurazione non è compatibile con le risorse già in uso dal gruppo';
    }
  }

  checkResources(): boolean{
    console.log(this.data.group.resourceAvailable);
    let usedCpu = this.data.group.cpuMax - this.data.group.resourceAvailable.cpu;
    let usedRam = this.data.group.ramMax - this.data.group.resourceAvailable.ram;
    let usedDisk = this.data.group.diskSpaceMax - this.data.group.resourceAvailable.diskSpace;

    return this.maxCpu.value >= usedCpu
      && this.maxRam.value >= usedRam
      && this.maxDisk.value >= usedDisk
      && this.maxInstances.value >= this.data.group.resourceAvailable.totVM
      && this.activeInstances.value >= this.data.group.resourceAvailable.activeVM;
  }


}
