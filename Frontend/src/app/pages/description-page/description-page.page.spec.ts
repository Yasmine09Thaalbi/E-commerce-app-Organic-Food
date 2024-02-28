import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DescriptionPagePage } from './description-page.page';

describe('DescriptionPagePage', () => {
  let component: DescriptionPagePage;
  let fixture: ComponentFixture<DescriptionPagePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DescriptionPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
