import { TestBed } from '@angular/core/testing';

import { DataNftService } from './data-nft.service';

describe('DataNftService', () => {
  let service: DataNftService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataNftService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
