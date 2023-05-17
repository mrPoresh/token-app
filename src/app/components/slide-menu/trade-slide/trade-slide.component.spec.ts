import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeSlideComponent } from './trade-slide.component';

describe('TradeSlideComponent', () => {
  let component: TradeSlideComponent;
  let fixture: ComponentFixture<TradeSlideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradeSlideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TradeSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
