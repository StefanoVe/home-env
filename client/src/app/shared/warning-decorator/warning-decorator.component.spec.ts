import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarningDecoratorComponent } from './warning-decorator.component';

describe('WarningDecoratorComponent', () => {
  let component: WarningDecoratorComponent;
  let fixture: ComponentFixture<WarningDecoratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [WarningDecoratorComponent]
    });
    fixture = TestBed.createComponent(WarningDecoratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
