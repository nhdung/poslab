import { TestBed } from '@angular/core/testing';

import { DesService } from './des.service';

describe('DesService', () => {
  let service: DesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
