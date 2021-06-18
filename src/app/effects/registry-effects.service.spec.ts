import { TestBed } from '@angular/core/testing';

import { RegistryEffectsService } from './registry-effects.service';

describe('RegistryEffectsService', () => {
  let service: RegistryEffectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistryEffectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
