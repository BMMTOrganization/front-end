import { TestBed } from '@angular/core/testing';

import { BmmtService } from './bmmt.service';

describe('BmmtService', () => {
  let service: BmmtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BmmtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
