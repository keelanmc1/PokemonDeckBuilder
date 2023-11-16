import { Component, Input } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { DeckService } from '../deck.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-deck-info',
  templateUrl: './deck-info.component.html',
  styleUrls: ['./deck-info.component.css'],
})
export class DeckInfoComponent {
  constructor(private config: DynamicDialogConfig, private deckService: DeckService,
    private messageService: MessageService) {}

  @Input() public deck: any;

  ngOnInit() {
    this.deck = this.config.data.deck;
    console.log('we are here ' + this.deck.name);
  }

  deleteOnClick(deckId: string, pokemonId: string) {
    this.deckService.DeletePokemonFromDeck(deckId, pokemonId).subscribe((res:any) => {
      if (res.msg == 'pokemon successfully deleted') {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Deck successfully Created',
        });
      }
      console.log(res);
    })
  }
}
