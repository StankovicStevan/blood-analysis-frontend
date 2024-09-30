import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodReportComponent } from './blood-report.component';

describe('BloodReportComponent', () => {
  let component: BloodReportComponent;
  let fixture: ComponentFixture<BloodReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BloodReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BloodReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
