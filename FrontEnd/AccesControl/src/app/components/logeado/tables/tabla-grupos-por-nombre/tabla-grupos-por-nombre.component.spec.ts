import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaGruposPorNombreComponent } from './tabla-grupos-por-nombre.component';

describe('TablaGruposPorNombreComponent', () => {
  let component: TablaGruposPorNombreComponent;
  let fixture: ComponentFixture<TablaGruposPorNombreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaGruposPorNombreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaGruposPorNombreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
