import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "./auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  failed: boolean = false;
  url: string = "assets/default_profile.png";

  imageForm: FormGroup = this.builder.group({
    image: ['']
  })
  profileForm: FormGroup =  this.builder.group({
    name: ['', [Validators.required]],
    id: ['', [Validators.required]],
    firstName: ['', [Validators.required]],
    username: ['', [Validators.required]]
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

  get id(){
    return this.profileForm.get('id');
  }

  get username(){
    return this.profileForm.get('username');
  }

}
