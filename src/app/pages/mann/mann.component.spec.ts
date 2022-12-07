import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MannComponent } from './mann.component';

describe('MannComponent', () => {
  let component: MannComponent;
  let fixture: ComponentFixture<MannComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MannComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MannComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
