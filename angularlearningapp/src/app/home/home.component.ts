import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { HttpClient } from '@angular/common/http';
import { PokemonDialogComponent } from '../pokemon-dialog/pokemon-dialog.component';
import { PokemonService } from '../pokemon.service';
import { AuthService } from '../auth.service';
import { DeckService } from '../deck.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [DialogService, MessageService],
})
export class HomeComponent {
  pokemon: any;
  ref: DynamicDialogRef | undefined;

  constructor(
    private http: HttpClient,
    public dialogService: DialogService,
    public messageService: MessageService,
    private pokemonService: PokemonService,
    private authService: AuthService,
    private deckService: DeckService
  ) {}

  ngOnInit() {
    this.pokemonService
      .GetAllPokemon()
      .subscribe((response: any) => (this.pokemon = response));
  }

  onClick(pokiName: string) {
    this.pokemonService.GetPokemonByName(pokiName).subscribe((data: any) => {
      if (data) {
        this.ref = this.dialogService.open(PokemonDialogComponent, {
          header: `${pokiName}'s Information`,
          width: '70%',
          contentStyle: { overflow: 'auto' },
          baseZIndex: 10000,
          maximizable: true,
          data: {
            pokemon: data,
          },
        });
      } else {
        console.log('No pokemon data returned');
      }
    });
  }

  addPokemon(pokiName: string) {
    this.deckService.GetAllUserDecks().subscribe((data: any) => {
      this.pokemonService.GetPokemonByName(pokiName).subscribe((pokemon: any) => {
        this.ref = this.dialogService.open(PokemonDialogComponent, {
          header: 'Which deck would you like to add to?',
          width: '70%',
          contentStyle: { overflow: 'auto' },
          baseZIndex: 10000,
          maximizable: true,
          data: {
            deckData: data,
            pokemon: pokemon
          },
        });
      })
      })
  }
}
