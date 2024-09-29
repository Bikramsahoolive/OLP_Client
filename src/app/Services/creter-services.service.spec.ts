import { TestBed } from '@angular/core/testing';

import { CreterServicesService } from './creter-services.service';

describe('CreterServicesService', () => {
  let service: CreterServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreterServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
