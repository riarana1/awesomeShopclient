import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MostSellingComponent } from './most-selling.component';

describe('MostSellingComponent', () => {
  let component: MostSellingComponent;
  let fixture: ComponentFixture<MostSellingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MostSellingComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostSellingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
