import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { HttpClient } from '@angular/common/http';
import {PokemonDialogComponent} from '../pokemon-dialog/pokemon-dialog.component'
import {PokemonService} from '../pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [DialogService, MessageService]
})
export class HomeComponent {  
  pokemon: any 
  ref: DynamicDialogRef | undefined;

  constructor(private http: HttpClient, public dialogService: DialogService,
     public messageService: MessageService,
     private pokemonService : PokemonService) {}

  ngOnInit() {
    this.http.get('http://127.0.0.1:5000/api/v1.0/pokemon').subscribe((response:any) => this.pokemon = response);
      
  }

  onClick(pokiName : string) {
    this.pokemonService.GetPokemonByName(pokiName).subscribe((data:any) => {
      console.log('Pokemon details:', data);

    console.log("before dialog: "+ JSON.stringify(this.pokemon))
    if (data) {
      this.ref = this.dialogService.open(PokemonDialogComponent, {
        header: 'Pokemon Information',
        width: '70%',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        maximizable: true,
        data: {
          pokemon: data,
        },
      });
    }
    else {
      console.log("No pokemon data returned")
    }
  });
}

}
