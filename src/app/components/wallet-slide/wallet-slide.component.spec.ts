import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletSlideComponent } from './wallet-slide.component';

describe('WalletSlideComponent', () => {
  let component: WalletSlideComponent;
  let fixture: ComponentFixture<WalletSlideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalletSlideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalletSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
