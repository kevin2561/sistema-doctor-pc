import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosDesactivadosComponent } from './productos-desactivados.component';

describe('ProductosDesactivadosComponent', () => {
  let component: ProductosDesactivadosComponent;
  let fixture: ComponentFixture<ProductosDesactivadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductosDesactivadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductosDesactivadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
