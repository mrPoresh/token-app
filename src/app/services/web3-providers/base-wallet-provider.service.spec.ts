import { TestBed } from '@angular/core/testing';

import { BaseWalletProviderService } from './base-wallet-provider.service';

describe('BaseWalletProviderService', () => {
  let service: BaseWalletProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseWalletProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
