import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private jwtToken: string | null = null;
  private jwtHelper: JwtHelperService = new JwtHelperService();

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isUserLoggedIn: Observable<boolean> = this.isLoggedInSubject.asObservable();

  ngOnInit() {
    this.IsLoggedIn();
  }
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
        this.isLoggedInSubject.next(false);
        return false;
      }
      this.isLoggedInSubject.next(true);
      return true;
    }
    return false;
  }

  private ClearLocalStorage() {
    const token = this.GetJwtToken();
    localStorage.removeItem('jwtToken');
  }

  LogUserOut() {
    console.log('user logging out');
    const token = this.GetJwtToken();
    localStorage.removeItem('jwtToken');
    this.isLoggedInSubject.next(false);
  }

  constructor() {}
}
