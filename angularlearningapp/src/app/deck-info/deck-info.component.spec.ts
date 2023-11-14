import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckInfoComponent } from './deck-info.component';

describe('DeckInfoComponent', () => {
  let component: DeckInfoComponent;
  let fixture: ComponentFixture<DeckInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeckInfoComponent]
    });
    fixture = TestBed.createComponent(DeckInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
