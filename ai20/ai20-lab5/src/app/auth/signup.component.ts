import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';
import { DialogData } from './dialogData.module';
import { Router } from '@angular/router';


function emailFormatValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: boolean} | null => {
    if (control.value === null || control.value === '') {
      return null;
    }
    const fields = control.value.split('@');
    if (!fields[0].startsWith('s') && !fields[0].startsWith('d')) {
      return { wrongFormat : true };
    }
    if (fields[1] !== 'polito.it' && fields[1] !== 'studenti.polito.it') {
      return { wrongDomain : true };
    }
    if (fields[0].startsWith('s') && fields[1] !== 'studenti.polito.it') {
      return { wrongDomainStudent : true };
    }
    if (fields[0].startsWith('d') && fields[1] !== 'polito.it') {
      return { wrongDomainTeacher : true };
    }
    return null;
  };
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<SignupComponent>,
              private builder: FormBuilder,
              private service: AuthService,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private route: Router) {}
  get name(){
    return this.userForm.get('name');
  }

  get firstName(){
    return this.userForm.get('firstName');
  }

  get password(){
    return this.userForm.get('password');
  }

  get confirmPassword(){
    return this.userForm.get('confirmPassword');
  }

  get username(){
    return this.userForm.get('username');
  }

  userForm: FormGroup =  this.builder.group({
    name: ['', Validators.required ],
    firstName: ['', Validators.required],
    username: ['', [Validators.required, emailFormatValidator()
    ]],
    password: ['', [Validators.minLength(8), Validators.required]],
    confirmPassword: ['', [Validators.minLength(8),
      SignupComponent.matchValues('password'),
      Validators.required]]
  });
  hide = true;

  public static matchValues(
    matchTo: string // name of the control to match to
  ): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return !!control.parent &&
      !!control.parent.value &&
      control.value === control.parent.controls[matchTo].value
        ? null
        : {isMatching: false};
    };
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.route.navigate(['/home']);
    this.dialogRef.close();
  }

  signup(){
    const id = this.userForm.get('username').value.split('@')[0];
    this.service.signup( new User(
      this.userForm.get('username').value,
      this.userForm.get('password').value,
      id,
      this.userForm.get('name').value,
      this.userForm.get('firstName').value,
      ),
      this.dialogRef
    );
  }

}
