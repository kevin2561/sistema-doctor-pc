import { TestBed } from '@angular/core/testing';

import { ArtitasService } from './artitas.service';

describe('ArtitasService', () => {
  let service: ArtitasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtitasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
