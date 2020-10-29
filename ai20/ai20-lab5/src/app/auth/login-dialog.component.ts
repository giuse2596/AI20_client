import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../User.model';
import { AuthService } from './auth.service';
import { DialogData } from './dialogData.module';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {

  userForm: FormGroup =  this.builder.group({
                username: ['', [Validators.email, Validators.required]],
                password: ['', [Validators.minLength(8), Validators.required]]
  });

  loginFailed = false;

  constructor(public dialogRef: MatDialogRef<LoginDialogComponent>
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

  get password(){
    return this.userForm.get('password');
  }

  get username(){
    return this.userForm.get('username');
  }

  login(){
    this.service.login( new User(this.userForm.get('username').value,
      this.userForm.get('password').value), this.dialogRef );
  }

}
