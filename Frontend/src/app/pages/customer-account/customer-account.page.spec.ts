import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerAccountPage } from './customer-account.page';

describe('CustomerAccountPage', () => {
  let component: CustomerAccountPage;
  let fixture: ComponentFixture<CustomerAccountPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CustomerAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
