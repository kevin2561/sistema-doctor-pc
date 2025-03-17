import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesajeValidacionComponent } from './mesaje-validacion.component';

describe('MesajeValidacionComponent', () => {
  let component: MesajeValidacionComponent;
  let fixture: ComponentFixture<MesajeValidacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MesajeValidacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesajeValidacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
