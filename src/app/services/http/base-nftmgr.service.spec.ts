import { TestBed } from '@angular/core/testing';

import { BaseNftmgrService } from './base-nftmgr.service';

describe('BaseNftmgrService', () => {
  let service: BaseNftmgrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseNftmgrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
