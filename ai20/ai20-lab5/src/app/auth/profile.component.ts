import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {AuthService} from "./auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  failed: boolean = false;
  hide: boolean = true;
  url: string = "assets/default_profile.png";

  imageForm: FormGroup = this.builder.group({
    image: ['']
  })
  profileForm: FormGroup =  this.builder.group({
    name: ['', [Validators.required]],
    firstName: ['', [Validators.required]],
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
               private service: AuthService) { }

  ngOnInit(): void {
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
        : { isMatching: false };
    };
  }

}
