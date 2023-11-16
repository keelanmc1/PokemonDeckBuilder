import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.isUserLoggedIn.subscribe((isLoggedIn) => {
      this.UpdateMenuItems(isLoggedIn);
    });
  }

  items: MenuItem[] = [];

  private SetMenuItems(isLoggedIn: boolean): MenuItem[] {
    console.log('updated menu method called');

    if (isLoggedIn) {
      return [
        { label: 'Decks', routerLink: '/deck' },
        { label: 'Pokemon', routerLink: '/home' },
        {
          label: 'Log Out',
          routerLink: '/login',
          command: () => this.authService.LogUserOut(),
        },
      ];
    } else {
      return [{ label: 'Login/Register', routerLink: '/login' }];
    }
  }

  UpdateMenuItems(isLoggedIn: boolean) {
    this.items = this.SetMenuItems(isLoggedIn);
  }

  // items: MenuItem[] = [
  //   {
  //     label: 'Login/Register',
  //   },
  //   {
  //     label: 'Home',
  //   },
  //   {
  //     label: 'Log Out',
  //   },
  // ];
}
