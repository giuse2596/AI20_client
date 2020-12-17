import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {AuthService} from "./auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {User} from "../models/user.model";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  failed: boolean = false;
  hide: boolean = true;
  url: string = "assets/default_profile.png";
  currentUser: User;

  imageForm: FormGroup = this.builder.group({
    inputFile: ['']
  })
  profileForm: FormGroup =  this.builder.group({
    name: [this.service.user.name, [Validators.required]],
    firstName: [this.service.user.firstname, [Validators.required]],
  });

  passwordForm: FormGroup = this.builder.group({
    password: ['', [ Validators.minLength(8),
        Validators.required
      ]
    ],
    lastPassword: ['', [ Validators.minLength(8),
      Validators.required
     ]
    ],
    passwordConfirm: ['', [ Validators.minLength(8),
            ProfileComponent.matchValues('password'),
            Validators.required
      ]
    ]
  });

  constructor( private builder: FormBuilder,
               private service: AuthService,
               private resultBar: MatSnackBar) { }

  ngOnInit(): void {
    this.currentUser = this.service.user;
    console.log("current name: " + this.currentUser.name);
    this.profileForm.get('name').setValue(this.currentUser.name);
  }

  onChangeImage(event){
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event:any) => {
        this.url = event.target.result;
      }

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  get name(){
    return this.profileForm.get('name');
  }

  get firstName(){
    return this.profileForm.get('firstName');
  }

  get password(){
    return this.passwordForm.get('password');
  }

  get lastPassword(){
    return this.passwordForm.get('lastPassword');
  }

  get passwordConfirm(){
    return this.passwordForm.get('passwordConfirm');
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

  uploadImage(){


  }

  editData(){
    this.service.updateUser(this.currentUser, this);
  }

  editPassword(){

  }

  showResult(success: boolean, message: string){
    const panelClass = success ? 'result-bar-success' : 'result-bar-fail';
    this.resultBar.open(message,'', {
      duration: 5000,
      horizontalPosition: "center",
      verticalPosition: "top",
      panelClass: panelClass
    });
  }

}
