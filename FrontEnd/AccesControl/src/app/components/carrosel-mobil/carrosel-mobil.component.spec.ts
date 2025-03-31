import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarroselMobilComponent } from './carrosel-mobil.component';

describe('CarroselMobilComponent', () => {
  let component: CarroselMobilComponent;
  let fixture: ComponentFixture<CarroselMobilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarroselMobilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarroselMobilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
