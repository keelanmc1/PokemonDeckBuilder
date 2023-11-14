import { Component, Input } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-deck-info',
  templateUrl: './deck-info.component.html',
  styleUrls: ['./deck-info.component.css'],
})
export class DeckInfoComponent {
  constructor(private config: DynamicDialogConfig) {}
  @Input() public deck: any;

  ngOnInit() {
    this.deck = this.config.data.deck;
    console.log('we are here ' + this.deck.name);
  }
}
