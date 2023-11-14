import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private jwtToken: string | null = null;
  private jwtHelper: JwtHelperService = new JwtHelperService();

  SetJwtToken(token: string): void {
    // this.jwtToken = token;
    localStorage.setItem('jwtToken', token);
  }

  GetJwtToken(): string | null {
    // return this.jwtToken;
    return localStorage.getItem('jwtToken');
  }

  IsLoggedIn(): boolean {
    const token = this.GetJwtToken();
    if (token) {
      const isTokenExpired = this.jwtHelper.isTokenExpired(token);

      if (isTokenExpired) {
        this.ClearLocalStorage();
        return false;
      }
      return true;
    } else {
      return false;
    }
  }
  private ClearLocalStorage() {
    const token = this.GetJwtToken();
    localStorage.removeItem(String(token));
  }

  LogUserOut() {
    const token = this.GetJwtToken();
    localStorage.removeItem(String(token));
  }

  constructor() {}
}
