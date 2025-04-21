import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprobanteVentaComponent } from './comprobante-venta.component';

describe('ComprobanteVentaComponent', () => {
  let component: ComprobanteVentaComponent;
  let fixture: ComponentFixture<ComprobanteVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComprobanteVentaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComprobanteVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
