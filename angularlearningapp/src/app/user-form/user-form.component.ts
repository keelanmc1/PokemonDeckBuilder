import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm, NgModel } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})

export class UserFormComponent {

  constructor(private http : HttpClient){}

  users: {username: string, password: string} = {
    username: '',
    password: '',
  }

  isUsernameValid: boolean = true;

   onSubmit() 
   {
      if (this.users && this.users.username && this.users.password) 
      {
        if (!this.isLoginFormVisible) 
        {
          this.http.post('http://127.0.0.1:5000/api/v1.0/user', this.users)
          .subscribe((res: any) => {
            if (res.msg == 'user already exists') this.isUsernameValid = false;
            console.log(res)
          });
        }
        else 
        {
          this.http.post('http://127.0.0.1:5000/api/v1.0/user/login', this.users)
          .subscribe((res: any) => {
            if (res.msg == 'user already exists') this.isUsernameValid = false;
            console.log(res)
          });
        }

      }
      else 
      {
        this.isUsernameValid = false;
      }
  }

  isLoginFormVisible: boolean = true;

  showLoginForm(){
    this.isLoginFormVisible = true; 
  }
  showRegisterForm(){
    this.isLoginFormVisible = false;
  }
}
