import { TestBed } from '@angular/core/testing';

import { LoginWalletProviderService } from './login-wallet-provider.service';

describe('LoginWalletProviderService', () => {
  let service: LoginWalletProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginWalletProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
