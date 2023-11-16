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

  ngOnInit() {
    this.UpdateMenuItems();
  }

  items: MenuItem[] = [];

  private SetMenuItems(): MenuItem[] {
    console.log('updated menu method called');

    if (this.authService.IsLoggedIn()) {
      return [
          { label: 'Decks', routerLink: '/deck' },
          { label: 'Pokemon', routerLink: '/home' },
          { label: 'Log Out', routerLink: '/login', command: () => this.authService.LogUserOut() },
        ];
    } else {
      return [{ label: 'Login/Register', routerLink: '/login' }];
    }
  }

  UpdateMenuItems() {
    this.items = this.SetMenuItems();
  }

  get menuItems(): MenuItem[] {
    return this.SetMenuItems();
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
