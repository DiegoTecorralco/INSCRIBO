import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrucelFuncionesComponent } from './carrucel-funciones.component';

describe('CarrucelFuncionesComponent', () => {
  let component: CarrucelFuncionesComponent;
  let fixture: ComponentFixture<CarrucelFuncionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarrucelFuncionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarrucelFuncionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
