import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRouterComponent } from './home-router.component';

describe('HomeRouterComponent', () => {
  let component: HomeRouterComponent;
  let fixture: ComponentFixture<HomeRouterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HomeRouterComponent]
    });
    fixture = TestBed.createComponent(HomeRouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
