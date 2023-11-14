import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserFormComponent } from './user-form/user-form.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CardModule } from 'primeng/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { ToastModule } from 'primeng/toast';
import { HomeComponent } from './home/home.component';
import { DataViewModule } from 'primeng/dataview';
import { PokemonDialogComponent } from './pokemon-dialog/pokemon-dialog.component';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { DeckComponent } from './deck/deck.component';
import { DeckDialogComponent } from './deck-dialog/deck-dialog.component';
import { DeckInfoComponent } from './deck-info/deck-info.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UserFormComponent,
    HomeComponent,
    PokemonDialogComponent,
    DeckComponent,
    DeckDialogComponent,
    DeckInfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    InputTextModule,
    PasswordModule,
    CardModule,
    BrowserAnimationsModule,
    ButtonModule,
    MenubarModule,
    ToastModule,
    DataViewModule,
    DynamicDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
