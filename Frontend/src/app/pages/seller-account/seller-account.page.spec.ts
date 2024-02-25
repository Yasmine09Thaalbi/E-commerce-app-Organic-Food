import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SellerAccountPage } from './seller-account.page';

describe('SellerAccountPage', () => {
  let component: SellerAccountPage;
  let fixture: ComponentFixture<SellerAccountPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SellerAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
