import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  resonseToReturn: any;

  private getHeaders(): HttpHeaders {
    const token = this.authService.GetJwtToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return headers;
  }

  GetPokemonByName(name: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`http://127.0.0.1:5000/api/v1.0/pokemon/${name}`, {
      headers,
    });
  }

  GetAllPokemon(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get('http://127.0.0.1:5000/api/v1.0/pokemon', { headers });
  }
}
