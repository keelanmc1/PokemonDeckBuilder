import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }

  resonseToReturn : any;

  GetPokemonByName(name: string) : Observable<any> {
    return this.http.get(`http://127.0.0.1:5000/api/v1.0/pokemon/${name}`)
  }

  GetAllPokemon() : Observable<any> {
    return this.http.get('http://127.0.0.1:5000/api/v1.0/pokemon');
  }
}
