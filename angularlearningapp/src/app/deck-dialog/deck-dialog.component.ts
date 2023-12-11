import { Component, Input } from '@angular/core';
import { DeckService } from '../deck.service';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-deck-dialog',
  templateUrl: './deck-dialog.component.html',
  styleUrls: ['./deck-dialog.component.css'],
})
export class DeckDialogComponent {
  @Input() public deck: any = {};
  public isEditMode: boolean = false;

  constructor(
    private deckService: DeckService,
    private messageService: MessageService,
    private config: DynamicDialogConfig
  ) {}

  ngOnInit() {
    if (this.config.data && this.config.data.deck) {
      this.deck = this.config.data.deck;
      this.isEditMode = true;
      console.log(this.deck._id);
    }
  }

  onClick() {
    console.log(this.deck.name);
    this.deckService.CreateNewDeck(this.deck).subscribe((res: any) => {
      console.log(res);
      if (res.msg === 'deck successfully posted') {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Deck successfully Created',
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Something has went wrong, please try again...',
        });
      }
    });
  }

  onClickEdit() {
    const dataToPost = {
      name: this.deck.name,
      description: this.deck.description,
    };

    console.log('DEBUG POINT: ' + this.deck.description);
    this.deckService
      .EditDeckById(this.deck._id, dataToPost)
      .subscribe((res: any) => {
        console.log(res);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Deck successfully Updated!',
        });
      });
  }
}
