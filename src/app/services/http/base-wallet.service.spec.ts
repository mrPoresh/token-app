import { TestBed } from '@angular/core/testing';

import { BaseWalletService } from './base-wallet.service';

describe('BaseWalletService', () => {
  let service: BaseWalletService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseWalletService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
