import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomebridgeComponent } from './homebridge.component';

describe('HomebridgeComponent', () => {
  let component: HomebridgeComponent;
  let fixture: ComponentFixture<HomebridgeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HomebridgeComponent]
    });
    fixture = TestBed.createComponent(HomebridgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
