import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ForumsPage } from './forums.page';

describe('ForumsPage', () => {
  let component: ForumsPage;
  let fixture: ComponentFixture<ForumsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
