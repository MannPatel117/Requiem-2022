import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessEmailSentComponent } from './success-email-sent.component';

describe('SuccessEmailSentComponent', () => {
  let component: SuccessEmailSentComponent;
  let fixture: ComponentFixture<SuccessEmailSentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessEmailSentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessEmailSentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
