import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardGrupoPorNombreComponent } from './card-grupo-por-nombre.component';

describe('CardGrupoPorNombreComponent', () => {
  let component: CardGrupoPorNombreComponent;
  let fixture: ComponentFixture<CardGrupoPorNombreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardGrupoPorNombreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardGrupoPorNombreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
