import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GPageNotFoundComponent } from './g-page-not-found.component';

describe('GPageNotFoundComponent', () => {
  let component: GPageNotFoundComponent;
  let fixture: ComponentFixture<GPageNotFoundComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [GPageNotFoundComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GPageNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
