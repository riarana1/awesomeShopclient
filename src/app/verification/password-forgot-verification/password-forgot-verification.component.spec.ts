import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PasswordForgotVerificationComponent } from './password-forgot-verification.component';

describe('PasswordForgotVerificationComponent', () => {
  let component: PasswordForgotVerificationComponent;
  let fixture: ComponentFixture<PasswordForgotVerificationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordForgotVerificationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordForgotVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
