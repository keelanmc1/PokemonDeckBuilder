import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm, NgModel } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
  providers: [MessageService],
})
export class UserFormComponent {
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  users: { username: string; password: string } = {
    username: '',
    password: '',
  };

  isUsernameValid: boolean = true;

  onSubmit() {
    if (this.users && this.users.username && this.users.password) {
      if (!this.isLoginFormVisible) {
        this.http
          .post('http://127.0.0.1:5000/api/v1.0/user', this.users)
          .subscribe((res: any) => {
            if (res.msg == 'user already exists') {
              this.isUsernameValid = false;

              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail:
                  'Username already registered, please try again or sign in!',
              });
            } else {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Registered successfully',
              });
            }
            console.log(res);
          });
      } else {
        this.http
          .post('http://127.0.0.1:5000/api/v1.0/user/login', this.users)
          .subscribe((res: any) => {
            if (res.msg === 'invalid credentials') {
              this.isUsernameValid = false;
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Incorrect credentials, please try again',
              });
            }

            console.log(res);
          });
      }
    } else {
      this.isUsernameValid = false;
    }
  }

  isLoginFormVisible: boolean = true;

  showLoginForm() {
    this.isLoginFormVisible = true;
  }
  showRegisterForm() {
    this.isLoginFormVisible = false;
  }
}
