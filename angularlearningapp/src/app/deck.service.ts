import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DeckService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  CreateNewDeck(data: any): Observable<any> {
    const token = this.authService.GetJwtToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(
      'http://127.0.0.1:5000/api/v1.0/users/createDeck',
      data,
      { headers }
    );
  }

  GetDeckInformation(deckId: string) {
    const token = this.authService.GetJwtToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(
      'http://127.0.0.1:5000/api/v1.0/users/deck/' + deckId,
      {
        headers,
      }
    );
  }

  DeleteDeckById(deckId: string) {
    const token = this.authService.GetJwtToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.delete(
      'http://127.0.0.1:5000/api/v1.0/users/deck/' + deckId,
      { headers }
    );
  }

  EditDeckById(deckId: string, data: any) {
    console.log('viewing the state of the deck');
    console.log(data);

    const token = this.authService.GetJwtToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const options = { headers };

    return this.http.put(
      `http://127.0.0.1:5000/api/v1.0/users/deck/${deckId}`,
      data,
      options
    );
  }

  GetAllUserDecks() {
    const token = this.authService.GetJwtToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get('http://127.0.0.1:5000/api/v1.0/users/deck', {
      headers,
    });
  }

  DeletePokemonFromDeck(deckId: string, pokemonId: string) {
    const token = this.authService.GetJwtToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.delete(
      `http://127.0.0.1:5000/api/v1.0/user/deck/${deckId}/${pokemonId}`,
      { headers }
    );
  }
}
