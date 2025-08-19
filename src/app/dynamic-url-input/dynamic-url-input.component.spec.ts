import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicUrlInputComponent } from './dynamic-url-input.component';

describe('DynamicUrlInputComponent', () => {
  let component: DynamicUrlInputComponent;
  let fixture: ComponentFixture<DynamicUrlInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DynamicUrlInputComponent]
    });
    fixture = TestBed.createComponent(DynamicUrlInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
