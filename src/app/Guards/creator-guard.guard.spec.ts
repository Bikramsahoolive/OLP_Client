import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { creatorGuardGuard } from './creator-guard.guard';

describe('creatorGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => creatorGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
