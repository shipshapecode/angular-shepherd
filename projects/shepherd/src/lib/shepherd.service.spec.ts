import { TestBed } from '@angular/core/testing';

import { ShepherdService } from './shepherd.service';

describe('ShepherdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShepherdService = TestBed.get(ShepherdService);
    expect(service).toBeTruthy();
  });
});
