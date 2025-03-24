import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselMarketComponent } from './carousel-market.component';

describe('CarouselMarketComponent', () => {
  let component: CarouselMarketComponent;
  let fixture: ComponentFixture<CarouselMarketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselMarketComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarouselMarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
