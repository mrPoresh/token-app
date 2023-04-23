import { TestBed } from '@angular/core/testing';

import { BaseUsermgrService } from './base-usermgr.service';

describe('BaseUsermgrService', () => {
  let service: BaseUsermgrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseUsermgrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
