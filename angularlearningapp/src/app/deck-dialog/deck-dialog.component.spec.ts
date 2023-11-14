import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckDialogComponent } from './deck-dialog.component';

describe('DeckDialogComponent', () => {
  let component: DeckDialogComponent;
  let fixture: ComponentFixture<DeckDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeckDialogComponent]
    });
    fixture = TestBed.createComponent(DeckDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
