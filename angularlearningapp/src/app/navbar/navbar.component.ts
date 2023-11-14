import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private authService: AuthService) {
    this.UpdateMenuItems();
  }
  items: MenuItem[] = [];

  private UpdateMenuItems(): void {
    console.log('updated menu method called');
    if (this.authService.IsLoggedIn()) {
      this.items = [
        { label: 'Decks', routerLink: '/deck' },
        { label: 'Pokemon', routerLink: '/home' },
        { label: 'Log Out', routerLink: '/login' },
      ];
    } else {
      this.items = [{ label: 'Login/Register', routerLink: '/login' }];
    }
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
