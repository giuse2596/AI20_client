import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {AuthService} from "./auth.service";
import {User} from "../models/user.model";
import {Observable} from "rxjs";
import {PasswordModel} from "../models/password.model";
import {MessageService} from "../services/message.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  failed: boolean = false;
  hide: boolean = true;
  url: any;
  currentUser: User;
  image: any;

  currentImage$: Observable<any>;

  imageForm: FormGroup = this.builder.group({
    inputFile: ['']
  })

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
               private messageService: MessageService) { }

  ngOnInit(): void {
    this.currentUser = this.service.user;
    console.log("current name: " + this.currentUser.name);
    this.service.getProfileImage().subscribe(
      val => {
        this.createImageFromBlob(val);
      }
    )
  }

  onChangeImage(event){

    if (event.target.files && event.target.files[0]) {
      this.image = event.target.files[0];
      var reader = new FileReader();

      reader.onload = (event:any) => {
        this.url = event.target.result;
      }

      reader.readAsDataURL(event.target.files[0]);
    }
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
    this.service.uploadImage(this.image, this);
  }

  editPassword(){
    this.service.updatePassword(new PasswordModel(this.lastPassword.value, this.password.value), this);
  }

  showResult(success: boolean, message: string){
    this.messageService.printMessage(success, message);
  }

  getImage(){
    this.currentImage$ = this.service.getProfileImage();
  }

  private createImageFromBlob(data: Blob) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.url = reader.result;
    }, false);

    if (data) {
      reader.readAsDataURL(data);
    }
  }
}
