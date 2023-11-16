import { Component, Input, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { DeckService } from '../deck.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-pokemon-dialog',
  templateUrl: './pokemon-dialog.component.html',
  styleUrls: ['./pokemon-dialog.component.css'],
})
export class PokemonDialogComponent implements OnInit {
  @Input() public pokemon: any;
  @Input() public deckData: any;

  isAdd: boolean = true;

  constructor(private config: DynamicDialogConfig, private deckService: DeckService,
    private messageService: MessageService) {}

  ngOnInit() {
    this.pokemon = {}
    if (this.config.data && this.config.data.pokemon && !this.config.data.deckData) {
      this.pokemon = this.config.data.pokemon;
      this.isAdd = false;
    } 
    else if (this.config.data && this.config.data.deckData && this.config.data.pokemon){
      console.log(this.config.data.deckData)
      this.deckData = this.config.data.deckData;
      this.pokemon = this.config.data.pokemon
      this.isAdd = true;
    }
    else {
      console.log("No data present on the component!")
    }
  }

  onDeckClick(deckId: string, pokemon: any) {
    console.log(this.config.data.pokemon._id)
    const pokiData = {
      "pokemon": pokemon
    }

    this.deckService.EditDeckById(deckId, pokiData)
      .subscribe((res: any) => {
        console.log(res);
        if (res.msg == 'deck successfully updated') {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Pokemon successfully added to deck!',
          });
        }
      })
  }
}
