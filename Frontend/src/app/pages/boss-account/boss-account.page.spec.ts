import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BossAccountPage } from './boss-account.page';

describe('BossAccountPage', () => {
  let component: BossAccountPage;
  let fixture: ComponentFixture<BossAccountPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BossAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
