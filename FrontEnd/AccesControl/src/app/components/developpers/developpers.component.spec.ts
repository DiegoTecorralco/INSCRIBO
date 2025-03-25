import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloppersComponent } from './developpers.component';

describe('DeveloppersComponent', () => {
  let component: DeveloppersComponent;
  let fixture: ComponentFixture<DeveloppersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeveloppersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeveloppersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
