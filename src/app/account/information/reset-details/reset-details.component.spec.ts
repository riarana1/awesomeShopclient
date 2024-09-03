import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ResetDetailsComponent } from './reset-details.component';

describe('ResetDetailsComponent', () => {
  let component: ResetDetailsComponent;
  let fixture: ComponentFixture<ResetDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ResetDetailsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
