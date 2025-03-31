import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficasGruposPorNombreComponent } from './graficas-grupos-por-nombre.component';

describe('GraficasGruposPorNombreComponent', () => {
  let component: GraficasGruposPorNombreComponent;
  let fixture: ComponentFixture<GraficasGruposPorNombreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraficasGruposPorNombreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficasGruposPorNombreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
