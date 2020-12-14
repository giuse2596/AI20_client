import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';
import { DialogData } from './dialogData.module';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  userForm: FormGroup =  this.builder.group({
    name: ['', Validators.required ],
    firstName: ['', Validators.required],
    id: ['', Validators.required],
    username: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.minLength(8), Validators.required]],
    confirmPassword: ['',[Validators.minLength(8),
      SignupComponent.matchValues('password'),
      Validators.required]]
  });
  hide = true;
  constructor(public dialogRef: MatDialogRef<SignupComponent>
    , private builder: FormBuilder,
              private service: AuthService,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private route: Router) {}

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.route.navigate(['/home']);
    this.dialogRef.close();
  }
  get name(){
    return this.userForm.get('name');
  }

  get firstName(){
    return this.userForm.get('firstName');
  }

  get id(){
    return this.userForm.get('id');
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

  signup(){
    this.service.signup( new User(
      this.userForm.get('username').value,
      this.userForm.get('password').value,
      this.userForm.get('id').value,
      this.userForm.get('name').value,
      this.userForm.get('firstName').value,
      ),
      this.dialogRef
    );
  }

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

}
