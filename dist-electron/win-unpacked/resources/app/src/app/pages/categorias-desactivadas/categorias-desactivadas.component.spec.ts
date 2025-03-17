import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriasDesactivadasComponent } from './categorias-desactivadas.component';

describe('CategoriasDesactivadasComponent', () => {
  let component: CategoriasDesactivadasComponent;
  let fixture: ComponentFixture<CategoriasDesactivadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoriasDesactivadasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriasDesactivadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
