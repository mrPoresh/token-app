import { TestBed } from '@angular/core/testing';

import { SlideMenuBtnService } from './slide-menu-btn.service';

describe('SlideMenuBtnService', () => {
  let service: SlideMenuBtnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlideMenuBtnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
