import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {VmDialog} from "../models/vmDialog.module";
import {VmImage} from "../models/vmImage.model";
import {Student} from "../models/student.model";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-edit-vm-dialog',
  templateUrl: './edit-vm-dialog.component.html',
  styleUrls: ['./edit-vm-dialog.component.css']
})
export class EditVmDialogComponent implements OnInit {

  vmForm: FormGroup = this.builder.group({
    vmName: ['', Validators.required],
    cpu: ['', [Validators.required, Validators.min(1)]],
    ram: ['', [Validators.required, Validators.min(1)]],
    disk: ['', [Validators.required, Validators.min(1)]]
  });

  owners: FormControl = new FormControl();

  displayColumnsMembers: string[] = ['id', 'name', 'firstName'];

  dataSourceOwners: MatTableDataSource<Student> = new MatTableDataSource<Student>();
  memberList: Student[];


  constructor(private dialogRef: MatDialogRef<EditVmDialogComponent>,
              private builder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: VmDialog) { }

  ngOnInit(): void {
    if(this.data.vm){
      this.vmName.setValue(this.data.vm.name);
      this.cpu.setValue(this.data.vm.cpu);
      this.ram.setValue(this.data.vm.ram);
      this.disk.setValue(this.data.vm.diskSpace);
    }

    if(this.data.members){
      this.memberList = this.data.members.filter(m => !this.data.vm.owners.map(o => o.id).includes(m.id));
    }

    this.dataSourceOwners = new MatTableDataSource<Student>(this.data.vm.owners);

  }

  get vmName(){
    return this.vmForm.get('vmName');
  }

  get cpu(){
    return this.vmForm.get('cpu');
  }

  get ram(){
    return this.vmForm.get('ram');
  }

  get disk(){
    return this.vmForm.get('disk');
  }

  onNoClick(){
    this.dialogRef.close(false);
  }

  save(){
    this.data.resourcesAvailable.cpu += this.data.vm.cpu;
    this.data.resourcesAvailable.ram += this.data.vm.ram;
    this.data.resourcesAvailable.diskSpace += this.data.vm.diskSpace;
    this.dialogRef.close({modify: true, data: new VmImage(this.data.vm.id,
        this.vmName.value,
        this.cpu.value,
        this.ram.value,
        this.disk.value),
      newResources: this.data.resourcesAvailable
    });
  }

  addOwners(){
    this.dialogRef.close({giveOwnership: true, owners: this.owners.value.map( s => s.id)})
  }

}
