import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {VmImage} from "../models/vmImage.model";
import {VmDialog} from "../models/vmDialog.module";

@Component({
  selector: 'app-create-vm-dialog',
  templateUrl: './create-vm-dialog.component.html',
  styleUrls: ['./create-vm-dialog.component.css']
})
export class CreateVmDialogComponent implements OnInit {

  vmForm: FormGroup = this.builder.group({
    vmName: ['', Validators.required],
    cpu: ['', [Validators.required, Validators.min(1)]],
    ram: ['', [Validators.required, Validators.min(1)]],
    disk: ['', [Validators.required, Validators.min(1)]]
  });



  constructor(private dialogRef: MatDialogRef<CreateVmDialogComponent>,
              private builder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: VmDialog) { }

  ngOnInit(): void {
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

  create(){
    this.dialogRef.close({result: true, data: new VmImage(0,
                                                         this.vmName.value,
                                                         this.cpu.value,
                                                         this.ram.value,
                                                         this.disk.value)
    });
  }

}
