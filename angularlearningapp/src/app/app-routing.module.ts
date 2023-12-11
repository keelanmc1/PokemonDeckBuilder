import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserFormComponent } from './user-form/user-form.component';
import { HomeComponent } from './home/home.component';
import { DeckComponent } from './deck/deck.component';
import { Router } from '@angular/router';
import { AuthGuard } from './auth-guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    component: UserFormComponent,
  },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'deck', component: DeckComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  constructor(private router: Router) {}

  RedirectToDeckPage() {
    this.router.navigate(['deck']);
  }

  RedirectToLogin() {
    this.router.navigate(['login']);
  }
}
