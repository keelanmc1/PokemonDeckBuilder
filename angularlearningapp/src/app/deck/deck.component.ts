import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { DeckDialogComponent } from '../deck-dialog/deck-dialog.component';
import { DeckService } from '../deck.service';
import { interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DeckInfoComponent } from '../deck-info/deck-info.component';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css'],
  providers: [DialogService, MessageService],
})
export class DeckComponent {
  deck: any;
  ref: DynamicDialogRef | undefined;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    public dialogService: DialogService,
    private deckService: DeckService,
    private messageService: MessageService
  ) {}

  async ngOnInit() {
    const token = this.authService.GetJwtToken();
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      };

      // setting up the component to listen to the endpoint for updates to dynamically display new data.
      interval(500)
        .pipe(
          switchMap(() =>
            this.http.get('http://127.0.0.1:5000/api/v1.0/users/deck', {
              headers,
            })
          )
        )
        .subscribe(
          (response: any) => (this.deck = response),
          (error) => {
            console.log(error);
          }
        );
    }
  }
  onClick(deckId: string) {
    console.log(deckId);
    this.deckService.GetDeckInformation(deckId).subscribe((res) => {
      console.log('successfully request');
      this.ref = this.dialogService.open(DeckInfoComponent, {
        header: `Deck Information`,
        width: '70%',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        maximizable: true,
        data: {
          deck: res,
        },
      });
    });
  }

  onClickCreate() {
    this.ref = this.dialogService.open(DeckDialogComponent, {
      header: `Create a Deck!`,
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
    });
  }

  deleteOnClick(deckId: string) {
    this.deckService.DeleteDeckById(deckId).subscribe((res: any) => {
      console.log(res);
      if (res.msg == 'deck successfully deleted') {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Deck successfully Created',
        });
      }
    });
  }

  editOnClick(deckId: string) {
    this.deckService.GetDeckInformation(deckId).subscribe((res) => {
      this.ref = this.dialogService.open(DeckDialogComponent, {
        header: `Edit Deck!`,
        width: '70%',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        maximizable: true,
        data: {
          deck: res,
        },
      });
    });
  }
}
