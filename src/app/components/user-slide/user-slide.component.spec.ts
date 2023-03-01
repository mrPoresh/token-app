import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSlideComponent } from './user-slide.component';

describe('UserSlideComponent', () => {
  let component: UserSlideComponent;
  let fixture: ComponentFixture<UserSlideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSlideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
