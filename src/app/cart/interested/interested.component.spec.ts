import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InterestedComponent } from './interested.component';

describe('InterestedComponent', () => {
  let component: InterestedComponent;
  let fixture: ComponentFixture<InterestedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [InterestedComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
