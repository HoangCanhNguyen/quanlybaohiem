import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotInsuranceComponent } from './not-insurance.component';

describe('NotInsuranceComponent', () => {
  let component: NotInsuranceComponent;
  let fixture: ComponentFixture<NotInsuranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotInsuranceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
