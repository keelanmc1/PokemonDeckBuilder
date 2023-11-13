import { Component, Input, Inject } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-pokemon-dialog',
  templateUrl: './pokemon-dialog.component.html',
  styleUrls: ['./pokemon-dialog.component.css'],
})
export class PokemonDialogComponent {
  constructor( private config: DynamicDialogConfig) {} 
  
  @Input() public pokemon: any;

  ngOnInit() {
    this.pokemon = this.config.data.pokemon;
    console.log("we are here " + this.pokemon.name)
  }
}
