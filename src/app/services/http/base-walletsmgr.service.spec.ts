import { TestBed } from '@angular/core/testing';

import { BaseWalletsmgrService } from './base-walletsmgr.service';

describe('BaseWalletsmgrService', () => {
  let service: BaseWalletsmgrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseWalletsmgrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
