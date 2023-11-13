import { Component } from '@angular/core';
import { AuthServiceService } from './auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isUserLoggedIn: boolean = false;

  constructor(private authService: AuthServiceService) {}

  ngOnInit() {
    this.isUserLoggedIn = this.authService.isUserLoggedIn();
    console.log(this.isUserLoggedIn);
  }
}
